/** @jsx jsx */
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { searchBoardListRequest } from '../../reducers/search';
import { jsx, css } from '@emotion/core';
import { Section } from 'styles/Layout.style';
import { MarkdownLg, MarkdownSm } from 'styles/Markdown.style';
import { Color } from 'styles/Color.style';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonPreviewBoard from 'components/loading/SkeletonPreviewBoard';
import PreviewBoard from 'components/board/PreviewBoard';
import { media } from 'styles/Media.style';
import { useRouter } from 'next/router';

const Result: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const keyword = useSelector((state) => state.search.keyword);
    let list = useSelector((state) => state.search.boardList);
    const page = useSelector((state) => state.search.boardPage);

    const [boardList, setBoardList] = useState(list);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (page === 1) {
            SearchAPI(page);
        }
    }, [keyword]);

    const SearchAPI = async (page: number) => {
        setLoading(true);
        try {
            const response = await axios({
                method: 'GET',
                url: '/api/board/search',
                params: {
                    per_page: 10,
                    page: page,
                    keyword: keyword,
                },
                cache: true,
            });
            // console.log(response);
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
                dispatch(searchBoardListRequest(list, page));
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const goDetail = useCallback((id: number) => {
        router.push(`/detail/${id}`);
    }, []);

    return (
        <section
            css={css`
                ${media.lg`${Section()}`};
                ${media.sm`margin:0; width:auto; margin-top:1em;`}
            `}
        >
            <div
                css={css`
                    ${MarkdownLg(Color.gray200)};
                    margin-bottom: 1em;
                `}
            >
                <span
                    css={css`
                        ${MarkdownLg(Color.black, 600)}
                    `}
                >
                    '{keyword}'
                </span>{' '}
                검색결과
            </div>
            <InfiniteScroll
                css={css`
                    &.infinite-scroll-component {
                        overflow: revert !important;
                    }
                `}
                dataLength={boardList.length}
                next={() => SearchAPI(page + 1)}
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
        </section>
    );
};

export default Result;
