import React, { useCallback, useEffect, useState } from 'react';
import SEO from 'components/SEO/SEO';
import styled from '@emotion/styled';
import MainBanner from 'components/banner/MainBanner';
import PreviewBoard from 'components/board/PreviewBoard';
import PreviewWrite from 'components/board/PreviewWrite';
import axios from 'axios';
import SideBanner from 'components/banner/SideBanner';
import { Section } from 'styles/Layout.style';
import { css } from '@emotion/core';
import { media } from 'styles/Media.style';
import Identification from 'components/mypage/Identification';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MarkdownSm } from 'styles/Markdown.style';
import { Color } from 'styles/Color.style';
import { useDispatch, useSelector } from 'react-redux';
import { boardListRequest } from 'reducers/board';
import SkeletonPreviewBoard from 'components/loading/SkeletonPreviewBoard';
import { useRouter } from 'next/router';

function Page(): JSX.Element {
    const router = useRouter();
    const dispatch = useDispatch();
    let list = useSelector((state) => state.board.boardList);
    const page = useSelector((state) => state.board.boardPage);
    const [boardList, setBoardList] = useState(list);

    const [user, setUser] = useState(null);
    const [mainBanner, setMainBanner] = useState(null);
    const [sideBanner, setSideBanner] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (page === 1) {
            BoardAPI(page);
        }
        UserAPI();
        BannerAPI();
    }, []);
    const BoardAPI = useCallback(async (page: number) => {
        setLoading(true);
        try {
            const response = await axios({
                method: 'GET',
                url: '/api/board/list',
                params: {
                    per_page: 10,
                    page: page,
                    cache: true,
                },
            });
            // console.log(response.data);
            if (response.status === 200) {
                if (page > 1) {
                    response.data.data.map((item: any) => {
                        list.push(item);
                    });
                } else {
                    list = response.data.data;
                }

                setBoardList(list);
                if (response.data.last_page <= page) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }

                dispatch(boardListRequest(list, page));
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
        }
    }, []);

    const UserAPI = useCallback(async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/user/me',
                cache: true,
            });
            // console.log(response);
            if (response.status === 200) {
                setUser(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    const BannerAPI = useCallback(async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: '/api/banner',
                cache: true,
            });
            // console.log(response);
            if (response.status === 200) {
                setMainBanner(
                    response.data.data.filter((data: any) => data.location === 'main')[0]
                );
                setSideBanner(
                    response.data.data.filter((data: any) => data.location.includes('side'))
                );
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    const goDetail = useCallback((id: number) => {
        router.push(`/detail/${id}`);
    }, []);
    return (
        <>
            <SEO
                title="스쿨빌런 | 전국 5570개 중고등학교를 대표하는 학생 커뮤니티"
                description="중고등학생 커뮤니티 스쿨빌런입니다."
                keywords="익명, 커뮤니티, 배너광고, 아이돌, 덕질, 익명고백, 학교정보, 입시정보, 고등학생, 중학생, 전학, 대나무 숲, 중고등학생을 위한 대나무 숲!, 학교축제, 인맥, 친구, 뒷담화, 학생 대표 커뮤니티
전국 5570개 중고등학교를 대표하는 학생 커뮤니티, school villain, 학교 생활정보, 익명 커뮤니티, 시간표, 대학, 중학교, 고등학교, 고백, 10대, 진로고민, 성적고민, 연애고민, 가정고민, 청소년, 사춘기, 상담"
            />
            <IndexSection>
                <Nav>
                    <Identification user={user} />
                    <SideBanner banner={sideBanner} />
                </Nav>

                <main
                    css={css`
                        width: 100%;
                    `}
                >
                    <PreviewWrite />
                    <MainBanner banner={mainBanner} />
                    <InfiniteScroll
                        css={css`
                            &.infinite-scroll-component {
                                overflow: revert !important;
                            }
                        `}
                        dataLength={boardList.length}
                        next={() => BoardAPI(page + 1)}
                        hasMore={hasMore}
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
                        <PreviewBoard loading={loading} boardList={boardList} goDetail={goDetail} />
                    </InfiniteScroll>
                </main>
            </IndexSection>
        </>
    );
}

export default Page;

const IndexSection = styled.section`
    ${Section};
    display: grid;
    grid-template-columns: 33% 65%;
    ${media.md`
     grid-template-columns: 100%;
  `};
`;

const Nav = styled.nav`
    ${media.md`display:none;`};
    position: -webkit-sticky;
    position: sticky;
    margin-right: 1rem;
    top: 6em;
    height: 90vh;
    box-sizing: border-box;
`;
