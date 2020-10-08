/** @jsx jsx */
import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FlexBox, Section } from 'styles/Layout.style';
import { Color } from 'styles/Color.style';
import { MarkdownBase, MarkdownSm } from 'styles/Markdown.style';
import { useDispatch, useSelector } from 'react-redux';
import { likeBoardListRequest, postBoardListRequest, replyBoardListRequest } from 'reducers/board';
import { useRouter } from 'next/router';
import axios from 'axios';
import { authLogoutFailure, authLogoutRequest, authLogoutSuccess } from 'reducers/auth';
import SEO from 'components/SEO/SEO';
import Modal from 'components/modal/Modal';
import { css, jsx } from '@emotion/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonPreviewBoard from 'components/loading/SkeletonPreviewBoard';
import PreviewBoard from 'components/board/PreviewBoard';
import Profile from 'components/mypage/Profile';

function MyPage() {
    const dispatch = useDispatch();
    let likeBoardList = useSelector((state) => state.board.likeBoardList);
    const likeBoardPage = useSelector((state) => state.board.likeBoardPage);
    let postBoardList = useSelector((state) => state.board.postBoardList);
    const postBoardPage = useSelector((state) => state.board.postBoardPage);
    let replyBoardList = useSelector((state) => state.board.replyBoardList);
    const replyBoardPage = useSelector((state) => state.board.replyBoardPage);

    const [likeList, setLikeList] = useState(likeBoardList);
    const [boardList, setBoardList] = useState(postBoardList);
    const [replyList, setReplyList] = useState(replyBoardList);

    const [likeHasMore, setLikeHasMore] = useState(false);
    const [boardHasMore, setBoardHasMore] = useState(false);
    const [replyHasMore, setReplyHasMore] = useState(false);

    const [user, setUser] = useState(null);
    const [nickname, setNickname] = useState('');
    const [nicknameErr, setNicknameErr] = useState('');
    const [nicknameCheck, setNicknameCheck] = useState(false);
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPasswordErr, setCurrentPasswordErr] = useState('');
    const [currentPasswordCheck, setCurrentPasswordCheck] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordErr, setNewPasswordErr] = useState('');
    const [newPasswordCheck, setNewPasswordCheck] = useState(false);
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [newPasswordConfirmErr, setNewPasswordConfirmErr] = useState('');
    const [newPasswordConfirmCheck, setNewPasswordConfirmCheck] = useState(false);

    const [loading, setLoading] = useState({
        like: true,
        board: true,
        reply: true,
    });

    const tab = ['좋아요한 글', '작성한 글', '댓글 쓴 글', '내정보'];
    const [menu, setMenu] = useState(0);

    const router = useRouter();
    const { name } = router.query;

    useEffect(() => {
        if (name === 'like') {
            setMenu(0);
            if (likeBoardPage === 1) {
                MyLikeAPI(likeBoardPage);
            }
        }
        if (name === 'board') {
            setMenu(1);
            if (postBoardPage === 1) {
                MyBoardAPI(postBoardPage);
            }
        }
        if (name === 'reply') {
            setMenu(2);
            if (replyBoardPage === 1) {
                MyReplyAPI(replyBoardPage);
            }
        }
        if (name === 'profile') {
            setMenu(3);
            MyProfileAPI();
        }
    }, [name]);

    const MyLikeAPI = useCallback(async (page: number) => {
        setLoading({ ...loading, like: true });
        try {
            const response = await axios({
                method: 'GET',
                url: '/api/mypage/like',
                params: {
                    per_page: 10,
                    page: page,
                },
                cache: true,
            });
            // console.log(response);
            if (response.status === 200) {
                if (page > 1) {
                    response.data.data.map((item: any) => {
                        likeBoardList.push(item);
                    });
                } else {
                    likeBoardList = response.data.data;
                }
                setLikeList(likeBoardList);

                if (response.data.last_page <= page) {
                    setLikeHasMore(false);
                } else {
                    setLikeHasMore(true);
                }
                // setLikePage(page);
                dispatch(likeBoardListRequest(likeBoardList, page));
                setLoading({ ...loading, like: false });
            }
        } catch (err) {
            if (err.response.status === 422) {
                console.log(err);
            } else {
                console.log(err);
            }
            setLoading({ ...loading, like: false });
        }
    }, []);
    const MyBoardAPI = useCallback(async (page: number) => {
        setLoading({ ...loading, board: true });

        try {
            const response = await axios({
                method: 'GET',
                url: '/api/mypage/board',
                params: {
                    per_page: 10,
                    page: page,
                },
                cache: true,
            });
            // console.log(response);
            if (response.status === 200) {
                if (page > 1) {
                    response.data.data.map((item: any) => {
                        postBoardList.push(item);
                    });
                } else {
                    postBoardList = response.data.data;
                }
                setBoardList(postBoardList);

                if (response.data.last_page <= page) {
                    setBoardHasMore(false);
                } else {
                    setBoardHasMore(true);
                }
                // setBoardPage(page);
                dispatch(postBoardListRequest(postBoardList, page));
                setLoading({ ...loading, board: false });
            }
        } catch (err) {
            if (err.response.status === 422) {
                console.log(err);
            } else {
                console.log(err);
            }
            setLoading({ ...loading, board: false });
        }
    }, []);
    const MyReplyAPI = useCallback(async (page: number) => {
        setLoading({ ...loading, reply: true });

        try {
            const response = await axios({
                method: 'GET',
                url: '/api/mypage/comment',
                params: {
                    per_page: 5,
                    page: page,
                },
                cache: true,
            });
            // console.log(response);
            if (response.status === 200) {
                if (page > 1) {
                    response.data.data.map((item: any) => {
                        replyBoardList.push(item);
                    });
                } else {
                    replyBoardList = response.data.data;
                }

                setReplyList(replyBoardList);

                if (response.data.last_page <= page) {
                    setReplyHasMore(false);
                } else {
                    setReplyHasMore(true);
                }

                // setReplyPage(page);

                dispatch(replyBoardListRequest(replyBoardList, page));

                setLoading({ ...loading, reply: false });
            }
        } catch (err) {
            if (err.response.status === 422) {
                console.log(err);
            } else {
                console.log(err);
            }
            setLoading({ ...loading, reply: false });
        }
    }, []);
    const MyProfileAPI = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/user/me',
            });
            // console.log(response);
            if (response.status === 200) {
                setUser(response.data);
                setNickname(response.data.name || '익명');
                setNicknameCheck(true);
                setEmail(response.data.email);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNickname(value);

        if (value.length > 0) {
            setNicknameErr('');
            setNicknameCheck(true);
        } else {
            setNicknameErr('닉네임을 입력해주세요.');
            setNicknameCheck(false);
        }
    };
    const changeCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setCurrentPassword(value);

        const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/i;

        if (!PasswordRegex.test(value)) {
            setCurrentPasswordErr('숫자와 영문자 및 특수문자를 포함한 8~16자이어야 합니다.');
            setCurrentPasswordCheck(false);
        } else {
            setCurrentPasswordErr('');
            setCurrentPasswordCheck(true);
        }
    };
    const changeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNewPassword(value);

        const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/i;

        if (!PasswordRegex.test(value)) {
            setNewPasswordErr('숫자와 영문자 및 특수문자를 포함한 8~16자이어야 합니다.');
            setNewPasswordCheck(false);
        } else {
            setNewPasswordErr('');
            setNewPasswordCheck(true);
        }
    };
    const changeNewPasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNewPasswordConfirm(value);

        if (value !== newPassword) {
            setNewPasswordConfirmErr('패스워드가 일치하지 않습니다.');
            setNewPasswordConfirmCheck(false);
        } else {
            setNewPasswordConfirmErr('');
            setNewPasswordConfirmCheck(true);
        }
    };

    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [buttonName, setButtonName] = useState('');

    const editNickname = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/user/nickname',
                data: {
                    nickname: nickname,
                },
            });
            // console.log(response);
            if (response.status === 201) {
                setOpenModal(true);
                setTitle('닉네임 변경');
                setContents('닉네임 변경이 완료되었습니다.');
                setButtonName('확인');
            }
        } catch (err) {
            if (err.response.status === 422) {
                setNicknameErr('이미 존재하는 닉네임입니다.');
                setNicknameCheck(false);
                console.error(err.response);
            } else {
                console.error(err);
            }
        }
    };

    const editPassword = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/user/change/pw',
                data: {
                    new_password: newPassword,
                    current_password: currentPassword,
                },
            });
            // console.log(response);
            if (response.status === 201) {
                setOpenModal(true);
                setTitle('패스워드 변경');
                setContents('패스워드 변경이 완료되었습니다.');
                setButtonName('확인');
            }
        } catch (err) {
            if (err.response.status === 422) {
                setCurrentPasswordErr('비밀번호가 일치하지 않습니다.');
                setCurrentPasswordCheck(false);
                console.error(err);
            } else {
                console.error(err);
            }
        }
    };

    const goLogout = async () => {
        dispatch(authLogoutRequest());
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/user/logout',
            });
            // console.log(response);
            if (response.status === 204) {
                sessionStorage.removeItem('logged');
                window.location.href = '/';
                dispatch(authLogoutSuccess());
            }
        } catch (err) {
            console.log(err);
            dispatch(authLogoutFailure());
        }
    };
    const goWithdrawal = async () => {
        location.href = '/withdrawal';
    };

    const selectMenu = (idx: number) => {
        if (idx === 0) {
            router.push('/mypage/like');
        }
        if (idx === 1) {
            router.push('/mypage/board');
        }
        if (idx === 2) {
            router.push('/mypage/reply');
        }
        if (idx === 3) {
            router.push('/mypage/profile');
        }
    };

    const goDetail = (id: number) => {
        router.push(`/detail/${id}`);
    };

    const confirmModal = () => {
        setOpenModal(false);
        location.reload();
    };

    return (
        <>
            <SEO
                title="마이페이지 | 스쿨빌런"
                description="스쿨빌런 마이페이지입니다."
                keywords="스쿨빌런 마이페이지"
            />

            <Modal
                openModal={openModal}
                confirmModal={confirmModal}
                title={title}
                contents={contents}
                buttonName={buttonName}
            />

            <MypageSection>
                <MypageTab>
                    {tab.map((item: string, index: number) => {
                        return (
                            <Tab
                                key={index}
                                css={css`
                                    ${menu === index
                                        ? css`
                                              border-bottom: 3px solid ${Color.purple200};
                                          `
                                        : css`
                                              border-bottom: 0;
                                          `}
                                `}
                                onClick={() => selectMenu(index)}
                            >
                                {item}
                            </Tab>
                        );
                    })}
                </MypageTab>
                <MypageContents>
                    {menu === 0 && (
                        <InfiniteScroll
                            css={css`
                                &.infinite-scroll-component {
                                    overflow: revert !important;
                                }
                            `}
                            dataLength={likeList.length}
                            next={() => MyLikeAPI(likeBoardPage + 1)}
                            hasMore={likeHasMore}
                            loader={<SkeletonPreviewBoard />}
                            endMessage={
                                <div
                                    css={css`
                                        text-align: center;
                                        padding: 5em;
                                        ${MarkdownSm(Color.gray200)}
                                    `}
                                >
                                    ●
                                </div>
                            }
                        >
                            <PreviewBoard
                                loading={loading.like}
                                boardList={likeList}
                                goDetail={goDetail}
                            />
                        </InfiniteScroll>
                    )}
                    {menu === 1 && (
                        <InfiniteScroll
                            css={css`
                                &.infinite-scroll-component {
                                    overflow: revert !important;
                                }
                            `}
                            dataLength={boardList.length}
                            next={() => MyBoardAPI(postBoardPage + 1)}
                            hasMore={boardHasMore}
                            loader={<SkeletonPreviewBoard />}
                            endMessage={
                                <div
                                    css={css`
                                        text-align: center;
                                        padding: 5em;
                                        ${MarkdownSm(Color.gray200)}
                                    `}
                                >
                                    ●
                                </div>
                            }
                        >
                            <PreviewBoard
                                loading={loading.board}
                                boardList={boardList}
                                goDetail={goDetail}
                            />
                        </InfiniteScroll>
                    )}
                    {menu === 2 && (
                        <InfiniteScroll
                            css={css`
                                &.infinite-scroll-component {
                                    overflow: revert !important;
                                }
                            `}
                            dataLength={replyList.length}
                            next={() => MyReplyAPI(replyBoardPage + 1)}
                            hasMore={replyHasMore}
                            loader={<SkeletonPreviewBoard />}
                            endMessage={
                                <div
                                    css={css`
                                        text-align: center;
                                        padding: 5em;
                                        ${MarkdownSm(Color.gray200)}
                                    `}
                                >
                                    ●
                                </div>
                            }
                        >
                            <PreviewBoard
                                loading={loading.reply}
                                boardList={replyList}
                                mypage={true}
                                goDetail={goDetail}
                            />
                        </InfiniteScroll>
                    )}
                    {menu === 3 && (
                        <Profile
                            user={user}
                            nickname={nickname}
                            nicknameErr={nicknameErr}
                            nicknameCheck={nicknameCheck}
                            changeNickname={changeNickname}
                            email={email}
                            currentPassword={currentPassword}
                            currentPasswordErr={currentPasswordErr}
                            currentPasswordCheck={currentPasswordCheck}
                            changeCurrentPassword={changeCurrentPassword}
                            newPassword={newPassword}
                            newPasswordErr={newPasswordErr}
                            newPasswordCheck={newPasswordCheck}
                            changeNewPassword={changeNewPassword}
                            newPasswordConfirm={newPasswordConfirm}
                            newPasswordConfirmErr={newPasswordConfirmErr}
                            newPasswordConfirmCheck={newPasswordConfirmCheck}
                            changeNewPasswordConfirm={changeNewPasswordConfirm}
                            editNickname={editNickname}
                            editPassword={editPassword}
                            goLogout={goLogout}
                            goWithdrawal={goWithdrawal}
                        />
                    )}
                </MypageContents>
            </MypageSection>
        </>
    );
}

export default MyPage;

const MypageSection = styled.section`
    ${Section()};
`;
const MypageTab = styled.nav`
    ${FlexBox('row', 'space-between', 'center')};
    margin-bottom: 2em;
    border-bottom: 1px solid ${Color.gray100};
    ${MarkdownBase('', 500)};
`;
const Tab = styled.li`
    width: 25%;
    cursor: pointer;
    padding: 1em 0;
    text-align: center;
`;
const MypageContents = styled.div``;
