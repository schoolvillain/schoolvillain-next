import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import produce from 'immer';
import SEO from 'components/SEO/SEO';
import ModalWrite from 'components/board/ModalWrite';
import PageWrite from 'components/board/PageWrite';

function Edit({ isOpen, boardId }) {
    const router = useRouter();
    const [id, setId] = useState(boardId || router.query.id);
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [tag, setTag] = useState('');
    const [tagList, setTagList] = useState([]);
    const [delTagList, setDelTagList] = useState([]);

    const [imgList, setImgList] = useState([]);
    const [delImgList, setDelImgList] = useState([]);

    const [previewList, setPreviewList] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        BoardAPI();
    }, []);

    const BoardAPI = useCallback(async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: '/api/board/read',
                params: {
                    id: id,
                },
            });
            // console.log(response);
            if (response.status === 200) {
                setId(response.data.id);
                setTitle(response.data.title);
                setContents(response.data.contents);
                setImgList(response.data.board_image);

                setPreviewList(
                    produce((draft) => {
                        response.data.board_image.map((item: any) => {
                            draft.push(item.path);
                        });
                    })
                );

                setTagList(response.data.hash_tags || []);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const changeContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';

        setContents(e.target.value);
    };

    const loadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;

        // console.log(files);

        Array.from(files).map((file: File, index: number) => {
            //사이즈 유효성
            if (file.size > 20 * 1024 * 1024) {
                alert('이미지 사이즈가 20mb를 넘습니다.');
            } else {
                //선택한 이미지 개수 + 이미 고른 이미지 개수 = 6 크.. 난 천재!
                if (index < 6 - imgList.length && imgList.length < 6 - index) {
                    // 이미지 file 정보 담기
                    setImgList(
                        produce((draft) => {
                            draft.push(file);
                        })
                    );

                    //이미지 url 정보 담기
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setPreviewList(
                            produce((draft) => {
                                draft.push(reader.result);
                            })
                        );
                    };
                    reader.readAsDataURL(file);
                } else {
                    alert('최대 6개까지 첨부할 수 있습니다.');
                }
            }
        });
    };
    const deleteImg = (index: number) => {
        setDelImgList(
            produce((draft) => {
                imgList[index].id && draft.push(imgList[index].id);
            })
        );
        setImgList(
            produce((draft) => {
                draft.splice(index, 1);
            })
        );
        setPreviewList(
            produce((draft) => {
                draft.splice(index, 1);
            })
        );
    };

    const changeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value);
    };

    const onEnter = (e: React.KeyboardEvent) => {
        if (tagList.length >= 10) {
            //모달 필요
            alert('최대 10개까지 가능합니다');
            setTag('');
        } else {
            if (e.key === 'Enter') {
                setTagList(
                    produce((draft) => {
                        draft.push(tag);
                    })
                );
                setTag('');
            }
        }
    };
    const deleteTag = (index: number) => {
        setDelTagList(
            produce((draft) => {
                tagList[index].id && draft.push(tagList[index].id);
            })
        );
        setTagList(
            produce((draft) => {
                draft.splice(index, 1);
            })
        );
    };

    const goEdit = async () => {
        setLoading(true);
        try {
            const formData = new FormData();

            formData.append('id', id);
            formData.append('title', title);
            formData.append('contents', contents);
            imgList.map((img: File, index: number) => {
                formData.append('images[]', imgList[index]);
            });
            delImgList.map((img: File, index: number) => {
                formData.append('deleteImages[]', img);
            });

            tagList.map((tag: string, index: number) => {
                if (typeof tagList[index] === 'object') {
                    formData.append('hashTags[]', tag.tag);
                } else {
                    formData.append('hashTags[]', tag);
                }
            });

            delTagList.map((tag: string, index: number) => {
                formData.append('deleteHashTags[]', tag);
            });

            const response = await axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                url: '/api/board/update',
                data: formData,
            });
            // console.log(response);
            if (response.status === 204) {
                window.location.href = `/detail/${id}`;
                setLoading(false);
            }
        } catch (err) {
            if (err.response.status === 401) {
                window.location.href = '/login';
            } else {
                // console.error(err.response);
            }
            setLoading(false);
        }
    };
    return (
        <>
            <SEO
                title="작성페이지 | 스쿨빌런"
                description="스쿨빌런 게시물 작성 페이지입니다."
                keywords="스쿨빌런 게시물 작성 페이지"
            />
            {window.screen.width > 480 ? (
                <ModalWrite
                    isOpen={isOpen}
                    name="수정"
                    title={title}
                    changeTitle={changeTitle}
                    contents={contents}
                    changeContents={changeContents}
                    tag={tag}
                    tagList={tagList}
                    changeTag={changeTag}
                    onEnter={onEnter}
                    deleteTag={deleteTag}
                    loadImg={loadImg}
                    deleteImg={deleteImg}
                    previewList={previewList}
                    loading={loading}
                    upload={goEdit}
                />
            ) : (
                <PageWrite
                    title={title}
                    changeTitle={changeTitle}
                    contents={contents}
                    changeContents={changeContents}
                    tag={tag}
                    tagList={tagList}
                    changeTag={changeTag}
                    onEnter={onEnter}
                    deleteTag={deleteTag}
                    loadImg={loadImg}
                    deleteImg={deleteImg}
                    previewList={previewList}
                    loading={loading}
                    upload={goEdit}
                />
            )}
        </>
    );
}

export default Edit;
