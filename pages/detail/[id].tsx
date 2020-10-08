import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import produce from 'immer';
import Board from 'components/board/Board';
import Reply from 'components/board/Reply';
import EditPage from '../edit/[id]';
import Edit from 'components/board/Edit';
import styled from '@emotion/styled';
import { Section } from 'styles/Layout.style';
import SEO from 'components/SEO/SEO';

function Detail(props) {
    const [board, setBoard]: any = useState(null);
    const [boardLikeId, setBoardLikeId] = useState(0);
    const [replyList, setReplyList] = useState([]);
    const [replyTotal, setReplyTotal] = useState(0);
    const [replyPage, setReplyPage] = useState(1);
    const [reReplyPage, setReReplyPage] = useState([]);
    const [replyLikeId, setReplyLikeId] = useState([]);
    const [reply, setReply] = useState('');
    const [reReply, setReReply] = useState([]);
    const [openReply, setOpenReply] = useState([] as any);
    const [openModal, setOpenModal] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        BoardAPI();
        ReplyAPI();
    }, []);

    const BoardAPI = useCallback(async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: '/api/board/read',
                params: {
                    id,
                },
            });
            // console.log(response);
            if (response.status === 200) {
                setBoard(response.data);
                if (response.data.my_like_id) {
                    setBoardLikeId(response.data.my_like_id.id);
                }
            }
        } catch (err) {
            // throw err;
        }
    }, []);

    const ReplyAPI = useCallback(async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: '/api/comment/list',
                params: {
                    board_id: id,
                    per_page: 10,
                    page: 1,
                },
            });
            // console.log(response.data);
            if (response.status === 200) {
                setReplyList(response.data.data);

                setReplyTotal(response.data.total);

                const likeId: any = [];
                const pages: any = [];

                response.data.data.map((reply: any, replyIndex: number) => {
                    pages.push(1);
                    likeId.push({ reply: response.data.data[replyIndex].my_like_id, reReply: [] });
                    reply.children.map((reReply: any, reReplyIndex: number) => {
                        likeId[replyIndex].reReply.push(
                            response.data.data[replyIndex].children[reReplyIndex].my_like_id
                        );
                    });
                });

                setReReplyPage(pages);
                setReplyLikeId(likeId);
            }
        } catch (err) {
            if (err.response.status === 422) {
                console.log(err);
            } else {
                // throw err;
            }
        }
    }, []);
    const likeBoard = async (id: number) => {
        try {
            if (boardLikeId > 0) {
                const response = await axios({
                    method: 'POST',
                    url: '/api/board/like/delete',
                    data: {
                        id: boardLikeId,
                    },
                });
                // console.log(response);
                if (response.status === 200) {
                    // console.log('좋아요 취소');
                    setBoard(
                        produce((draft) => {
                            draft.board_like_count = response.data.count;
                        })
                    );
                    setBoardLikeId(0);
                }
            } else {
                const response = await axios({
                    method: 'POST',
                    url: '/api/board/like/create',
                    data: {
                        id: id,
                    },
                });
                if (response.status === 200) {
                    // console.log(response.data);
                    setBoard(
                        produce((draft) => {
                            draft.board_like_count = response.data.count;
                        })
                    );
                    setBoardLikeId(response.data.id);
                }
            }
        } catch (err) {
            if (err.response.status === 401) {
                // alert('로그인이 필요합니다.');
                window.location.href = '/login';
            } else {
                // throw err;
            }
        }
    };
    const deleteBoard = async (id: number) => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/board/delete',
                data: {
                    id: id,
                },
            });
            if (response.status === 204) {
                // console.log(response);
                // window.location.href = '/';
                history.go(-1);
            }
        } catch (err) {
            // throw err;
        }
    };
    const editBoard = () => {
        if (screen.width > 480) {
            setOpenModal(true);
        } else {
            location.href = `/edit/${id}`;
        }
    };

    const changeReply = (reply: string) => {
        setReply(reply);
    };
    const changeReReply = (reReply: any, replyIndex: number) => {
        setReReply(
            produce((draft) => {
                draft[replyIndex] = reReply;
            })
        );
    };
    const likeReply = async (id: number, replyIndex: number, reReplyIndex: number | any) => {
        try {
            if (reReplyIndex !== null) {
                //대댓글
                if (replyLikeId[replyIndex].reReply[reReplyIndex]) {
                    //좋아요 취소
                    const response = await axios({
                        method: 'POST',
                        url: '/api/comment/like/delete',
                        data: {
                            id: replyLikeId[replyIndex].reReply[reReplyIndex].id,
                        },
                    });
                    if (response.status === 200) {
                        // console.log('대댓글 좋아요 취소');
                        setReplyList(
                            produce((draft) => {
                                draft[replyIndex].children[reReplyIndex].comment_like_count =
                                    response.data.count;
                                draft[replyIndex].children[reReplyIndex].comment_like = null;
                            })
                        );
                        setReplyLikeId(
                            produce((draft) => {
                                draft[replyIndex].reReply[reReplyIndex] = null;
                            })
                        );
                    }
                } else {
                    //좋아요 등록
                    const response = await axios({
                        method: 'POST',
                        url: '/api/comment/like/create',
                        data: {
                            id: id,
                        },
                    });
                    if (response.status === 200) {
                        // console.log(response.data);
                        setReplyList(
                            produce((draft) => {
                                draft[replyIndex].children[reReplyIndex].comment_like_count =
                                    response.data.count;
                                draft[replyIndex].children[reReplyIndex].comment_like =
                                    response.data.like;
                            })
                        );

                        setReplyLikeId(
                            produce((draft) => {
                                draft[replyIndex].reReply[reReplyIndex] = response.data.like;
                            })
                        );
                    }
                }
            } else {
                //댓글
                if (replyLikeId[replyIndex].reply) {
                    //좋아요 취소
                    const response = await axios({
                        method: 'POST',
                        url: '/api/comment/like/delete',
                        data: {
                            id: replyLikeId[replyIndex].reply.id,
                        },
                    });
                    if (response.status === 200) {
                        // console.log('댓글 좋아요 취소');
                        setReplyList(
                            produce((draft) => {
                                draft[replyIndex].comment_like_count = response.data.count;
                                draft[replyIndex].comment_like = null;
                            })
                        );
                        setReplyLikeId(
                            produce((draft) => {
                                draft[replyIndex].reply = null;
                            })
                        );
                    }
                } else {
                    //좋아요 등록
                    const response = await axios({
                        method: 'POST',
                        url: '/api/comment/like/create',
                        data: {
                            id: id,
                        },
                    });
                    if (response.status === 200) {
                        // console.log(response.data);
                        setReplyList(
                            produce((draft) => {
                                draft[replyIndex].comment_like_count = response.data.count;
                                draft[replyIndex].comment_like = response.data.like;
                            })
                        );
                        setReplyLikeId(
                            produce((draft) => {
                                draft[replyIndex].reply = response.data.like;
                            })
                        );
                    }
                }
            }
        } catch (err) {
            if (err.response.status === 401) {
                // alert('로그인이 필요합니다.');
                window.location.href = '/login';
            } else {
                throw err;
            }
        }
    };
    const deleteReply = async (id: number, replyIndex: number, reReplyIndex?: number | any) => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/comment/delete',
                data: {
                    id: id,
                },
            });

            // console.log(response);
            if (response.status === 204) {
                setBoard(
                    produce((draft) => {
                        draft.comment_count -= 1;
                    })
                );

                if (reReplyIndex !== null) {
                    setReplyList(
                        produce((draft) => {
                            draft[replyIndex].children.splice(reReplyIndex, 1);
                        })
                    );
                    setReplyLikeId(
                        produce((draft) => {
                            draft[replyIndex].reReply.splice(reReplyIndex, 1);
                        })
                    );
                } else {
                    setReplyList(replyList.filter((reply: any) => reply.id !== id));
                    setReplyLikeId(
                        produce((draft) => {
                            draft.splice(replyIndex, 1);
                        })
                    );
                }
            }
        } catch (err) {
            throw err;
        }
    };
    const saveReply = async (parentId: any, contents: string, replyIndex: any) => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/comment/create',
                data: {
                    board_id: id,
                    parent_id: parentId,
                    contents: contents,
                },
            });
            // console.log(response);
            if (response.status === 200) {
                setBoard(
                    produce((draft) => {
                        draft.comment_count += 1;
                    })
                );
                if (replyIndex !== null) {
                    setReplyList(
                        produce((draft) => {
                            if (!draft[replyIndex].children) draft[replyIndex].children = [];
                            draft[replyIndex].children.push(response.data);
                        })
                    );

                    setReplyLikeId(
                        produce((draft) => {
                            draft[replyIndex].reReply.push(null);
                        })
                    );
                    setReReply(
                        produce((draft) => {
                            draft[replyIndex] = '';
                        })
                    );
                } else {
                    setReplyList(
                        produce((draft) => {
                            draft.push(response.data);
                        })
                    );
                    setReplyLikeId(
                        produce((draft) => {
                            draft.push({ reply: response.data.my_like_id, reReply: [] });
                        })
                    );
                    setReply('');
                }
            }
        } catch (err) {
            if (err.response.status === 401) {
                // alert('로그인이 필요합니다.');
                window.location.href = '/login';
            } else if (err.response.status === 422) {
                alert('댓글을 입력해주세요.');
            } else {
                console.log(err);
            }
        }
    };
    const goReReply = useCallback(
        (idx: number) => {
            if (openReply.includes(idx)) {
                setOpenReply(openReply.filter((item: number) => item !== idx));
            } else {
                setOpenReply([idx, ...openReply]);
            }
        },
        [openReply]
    );

    const moreReply = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: '/api/comment/list',
                params: {
                    board_id: id,
                    per_page: 10,
                    page: replyPage + 1,
                },
            });
            // console.log(response.data);
            if (response.status === 200) {
                setReplyList(
                    produce((draft) => {
                        response.data.data.map((reply: any) => {
                            draft.push(reply);
                        });
                    })
                );

                setReplyPage(replyPage + 1);

                const likeId: any = [];
                const pages: any = [];

                response.data.data.map((reply: any, replyIndex: number) => {
                    pages.push(1);
                    likeId.push({ reply: response.data.data[replyIndex].my_like_id, reReply: [] });
                    reply.children.map((reReply: any, reReplyIndex: number) => {
                        likeId[replyIndex].reReply.push(
                            response.data.data[replyIndex].children[reReplyIndex].my_like_id
                        );
                    });
                });

                setReplyLikeId(
                    produce((draft) => {
                        likeId.map((id: any) => {
                            draft.push(id);
                        });
                    })
                );
                setReReplyPage(
                    produce((draft) => {
                        pages.map((page: any) => {
                            draft.push(page);
                        });
                    })
                );
            }
        } catch (err) {
            if (err.response.status === 422) {
                console.log(err);
            } else {
                // throw err;
            }
        }
    };
    const moreReReply = async (commentId: number, replyIndex: number) => {
        try {
            const response = await axios({
                method: 'GET',
                url: '/api/comment/reList',
                params: {
                    comment_id: commentId,
                    per_page: 5,
                    page: reReplyPage[replyIndex],
                },
            });
            // console.log(response);
            if (response.status === 200) {
                setReReplyPage(
                    produce((draft) => {
                        draft[replyIndex] += 1;
                    })
                );

                setReplyList(
                    produce((draft) => {
                        response.data.data.map((reReply: any) => {
                            draft[replyIndex].children.push(reReply);
                        });
                    })
                );

                setReplyLikeId(
                    produce((draft) => {
                        response.data.data.map((reReply: any, reReplyIndex: number) => {
                            draft[replyIndex].reReply.push(reReply.my_like_id);
                        });
                    })
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const isOpen = (open: boolean) => {
        setOpenModal(open);
    };
    return (
        <>
            <SEO
                title="상세페이지 | 스쿨빌런"
                description="스쿨빌런 게시물 상세 페이지입니다."
                keywords="스쿨빌런 게시물 상세 페이지"
            />
            <DetailSection>
                <Board
                    board={board}
                    likeBoard={likeBoard}
                    boardLikeId={boardLikeId}
                    deleteBoard={deleteBoard}
                    editBoard={editBoard}
                />

                <Reply
                    replyList={replyList}
                    replyTotal={replyTotal}
                    likeReply={likeReply}
                    goReReply={goReReply}
                    deleteReply={deleteReply}
                    openReply={openReply}
                    replyLikeId={replyLikeId}
                    reply={reply}
                    changeReply={changeReply}
                    saveReply={saveReply}
                    reReply={reReply}
                    changeReReply={changeReReply}
                    moreReply={moreReply}
                    moreReReply={moreReReply}
                />

                {openModal && <Edit isOpen={isOpen} boardId={id} />}
            </DetailSection>
        </>
    );
}

export default Detail;

const DetailSection = styled.section`
    ${Section()};
    margin-top: 6em;
`;
