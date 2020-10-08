/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { Color } from 'styles/Color.style';
import { FlexBox } from 'styles/Layout.style';
import { MarkdownBase, MarkdownMd, MarkdownSm } from 'styles/Markdown.style';
import { jsx, css } from '@emotion/core';
import { IconSm } from 'styles/Icon.style';
import { media } from 'styles/Media.style';
import { Tag } from 'styles/Util';
import { useState } from 'react';
import Write from 'components/board/Write';

const BoardSection = styled.section`
    cursor: pointer;
    padding: 1.8em 5%;
    background-color: ${Color.white};
    margin-bottom: 1.5em;
    border-radius: 0.3em;
    border: 1px solid ${Color.gray100};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;
interface boxProps {
    alignItems?: string;
}
const BoardBox = styled.div<boxProps>`
    ${(props: boxProps) => FlexBox('', 'space-between', props.alignItems || 'center')}
    ${MarkdownBase(Color.gray200)};
`;
const BoardTitle = styled.div`
    ${MarkdownMd(Color.black, 600)};
    margin-bottom: 0.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-word;
`;
const BoardContents = styled.div`
    ${MarkdownBase(Color.black, 400)};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-word;
`;
const Img = styled.img`
    position: relative;
    vertical-align: middle;
    //width: 20%;
    ${media.sm`width:25%;`}
`;
const ReplyName = styled.div`
    ${MarkdownSm('', 500)};
    margin-bottom: 0.5em;
`;
const ReplyContent = styled.p`
    word-break: break-all;
    display: inline-block;
    ${MarkdownBase()};
    background-color: ${Color.gray100};
    padding: 0.8em 1em;
    border-radius: 10px;
    margin-bottom: 0.5em;
`;
const Button = styled.button`
    ${MarkdownBase(Color.white)};
    width: 20em;
    height: 40px;
    border-radius: 0.3em;
    text-align: center;
    background-color: ${Color.purple200};
    &:hover {
        background-color: ${Color.purple300};
    }
`;

interface propsType {
    loading?: boolean;
    boardList: any;
    goDetail: any;
    mypage?: boolean;
}

const PreviewBoard: React.FC<propsType> = ({ loading, boardList, goDetail, mypage }) => {
    const textToTag = (str: string) => {
        const newLineRegex = /\n/g;
        str = str.replace(newLineRegex, '<br />');

        return str;
    };
    const [openModal, setOpenModal] = useState(false);

    const goWrite = () => {
        if (screen.width > 480) {
            setOpenModal(true);
        } else {
            location.href = '/write';
        }
    };
    const isOpen = (open: boolean) => {
        setOpenModal(open);
    };

    return (
        <>
            {loading || (boardList.length > 0 && boardList) ? (
                boardList.map((board: any, index: number) => {
                    return (
                        <BoardSection key={index} onClick={() => goDetail(board.id)}>
                            <BoardBox
                                alignItems="flex-start"
                                css={css`
                                    margin-bottom: 1em;
                                `}
                            >
                                <div
                                    css={css`
                                        margin-right: 0.5em;
                                    `}
                                >
                                    <BoardTitle
                                        dangerouslySetInnerHTML={{ __html: textToTag(board.title) }}
                                    />
                                    <BoardContents
                                        dangerouslySetInnerHTML={{
                                            __html: textToTag(board.contents),
                                        }}
                                    />
                                </div>
                                {board.thumbnail !== null ? (
                                    <Img src={`${board.thumbnail}?s=120x75&t=crop&q=60`} />
                                ) : null}
                            </BoardBox>

                            {board.hash_tags
                                ? board.hash_tags.map((tag: any, tagIndex: number) => {
                                      return (
                                          <React.Fragment key={tag.id}>
                                              {tagIndex < 3 ? <Tag># {tag.tag}</Tag> : null}
                                          </React.Fragment>
                                      );
                                  })
                                : null}

                            <BoardBox
                                css={css`
                                    margin-top: 1em;
                                    padding-top: 1em;
                                    border-top: 1px solid ${Color.gray100};
                                `}
                            >
                                <div
                                    css={css`
                                        ${FlexBox()};
                                    `}
                                >
                                    <div
                                        css={css`
                                            margin-right: 1em;
                                            ${FlexBox()};
                                        `}
                                    >
                                        <IconSm
                                            css={css`
                                                margin-right: 0.3em;
                                            `}
                                            src="/img/icon/view.svg"
                                        />
                                        <div>{board.board_view_log_count}</div>
                                    </div>
                                    <div>{board.create_time_ago}</div>
                                </div>
                                <div
                                    css={css`
                                        ${FlexBox()};
                                    `}
                                >
                                    <div
                                        css={css`
                                            background-color: ${Color.gray100};
                                            border-radius: 5em;
                                            padding: 0.3em 0.8em;
                                            margin-right: 1em;
                                            ${FlexBox()};
                                        `}
                                    >
                                        <IconSm
                                            css={css`
                                                margin-right: 0.3em;
                                            `}
                                            src="/img/icon/like.svg"
                                        />
                                        <div>{board.board_like_count}</div>
                                    </div>
                                    <div
                                        css={css`
                                            background-color: ${Color.gray100};
                                            border-radius: 5em;
                                            padding: 0.3em 0.8em;
                                            ${FlexBox()};
                                        `}
                                    >
                                        <IconSm
                                            css={css`
                                                margin-right: 0.3em;
                                            `}
                                            src="/img/icon/comment.svg"
                                        />
                                        <div>{board.comment_count}</div>
                                    </div>
                                </div>
                            </BoardBox>
                            {mypage && (
                                <div
                                    css={css`
                                        margin-top: 1em;
                                        padding-top: 1em;
                                        border-top: 1px solid ${Color.gray100};
                                    `}
                                >
                                    {board.comment.map((reply: any, index: number) => {
                                        return (
                                            <div
                                                key={index}
                                                css={css`
                                                    margin-top: 0.5em;
                                                `}
                                            >
                                                <ReplyName>
                                                    {reply.user.name ? reply.user.name : '익명'}{' '}
                                                    <span
                                                        css={css`
                                                            ${MarkdownSm(Color.gray200)}
                                                        `}
                                                    >
                                                        {reply.create_time_ago}
                                                    </span>
                                                </ReplyName>
                                                <ReplyContent
                                                    dangerouslySetInnerHTML={{
                                                        __html: textToTag(reply.contents),
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </BoardSection>
                    );
                })
            ) : (
                <div
                    css={css`
                        height: 50vh;
                        ${FlexBox('column')};
                        ${MarkdownBase(Color.gray200)}
                    `}
                >
                    <div>해당 게시글이 존재하지 않아요.</div>
                    <div
                        css={css`
                            margin-bottom: 1em;
                        `}
                    >
                        글을 작성하여,{' '}
                        <span
                            css={css`
                                font-weight: 700;
                            `}
                        >
                            당신의 인싸력
                        </span>
                        을 보여주세요.
                    </div>
                    <Button onClick={goWrite}>인싸글 도전하기</Button>
                </div>
            )}
            {openModal && <Write isOpen={isOpen} />}
        </>
    );
};
export default PreviewBoard;
