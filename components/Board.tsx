/** @jsx jsx */
import { useState } from 'react';
import styled from '@emotion/styled';
import { FlexBox } from 'assets/styles/Layout.style';
import { jsx, css } from '@emotion/core';
import { Color } from 'assets/styles/Color.style';
import { IconSm } from 'assets/styles/Icon.style';
import { MarkdownBase, MarkdownLg, MarkdownMd, MarkdownSm } from 'assets/styles/Markdown.style';
import produce from 'immer';
import SkeletonBoard from 'components/SkeletonBoard';
import { Tag } from 'assets/styles/Util';
import { media } from 'assets/styles/Media.style';

const BoardTitle = styled.div`
    ${MarkdownLg(Color.black, 600)};
    word-break: break-word;
`;
const BoardContents = styled.div`
  ${MarkdownBase(Color.black, 400)};
  word-break:break-word;
  margin-bottom:1em;
  line-height:1.7em;
  min-height: 5em;
}
`;
const SpeechBubble = styled.div`
    position: absolute;
    right: 5%;
    background: ${Color.white};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
    border-radius: 0.3rem;
    ${MarkdownSm(Color.gray200)}
    ${media.sm`
    right:5%;
  `}
`;
const SpeechBubbleContent = styled.div`
    text-align: center;
    word-break: keep-all;
    padding: 0.8rem 2.5rem;
    cursor: pointer;
    &:nth-of-type(1) {
        border-bottom: 1px solid ${Color.gray100};
    }
    &:hover {
        background-color: #fcfcfc;
    }
`;

interface BoxProps {
    justifyContent?: string;
    alignItems?: string;
}

const BoardBox = styled.div<BoxProps>`
    ${(props: BoxProps) =>
        FlexBox('', props.justifyContent || 'flex-start', props.alignItems || 'center')};
`;

interface propsType {
    board: any;
    likeBoard: any;
    boardLikeId: number;
    editBoard: any;
    deleteBoard: any;
}

const Board: React.FC<propsType> = ({ board, likeBoard, boardLikeId, editBoard, deleteBoard }) => {
    const [openModifyBox, setOpenModifyBox] = useState(false);

    const textToTag = (str: string) => {
        const newLineRegex = /\n/g;
        const urlRegex = /(https?:\/\/.*?)([.!?;,])?(\n|\s+|"|$)/g;
        str = str
            .replace(
                urlRegex,
                `<a href="$1" style="color:${Color.blue200};" target="_blank" >$1</a>`
            )
            .replace(newLineRegex, '<br />');
        return str;
    };

    return board ? (
        <>
            <div
                css={css`
                    margin-bottom: 1em;
                `}
            >
                <BoardTitle>{board.title}</BoardTitle>
            </div>
            <BoardBox
                justifyContent="space-between"
                alignItems="flex-end"
                css={css`
                    margin-bottom: 1em;
                    padding-bottom: 1em;
                    border-bottom: 1px solid ${Color.gray100};
                    ${MarkdownBase(Color.gray200)};
                `}
            >
                <div>
                    <div>{board.user.name ? board.user.name : '익명'}</div>
                    <div
                        css={css`
                            ${FlexBox('', 'flex-start', 'flex-start')};
                        `}
                    >
                        <div>{board.create_time_ago}</div>

                        <div
                            css={css`
                                padding: 0 0.5em;
                            `}
                        >
                            |
                        </div>

                        <div
                            css={css`
                                ${FlexBox('', 'center', 'center')};
                            `}
                        >
                            <IconSm
                                css={css`
                                    margin-right: 0.3em;
                                `}
                                src="/img/icon/view.svg"
                                alt="스쿨빌런 조회수 이미지"
                            />
                            <div>{board.board_view_log_count}</div>
                        </div>
                    </div>
                </div>
                <>
                    {board.is_mine ? (
                        <div
                            css={css`
                                position: relative;
                            `}
                        >
                            <div>
                                <IconSm
                                    css={css`
                                        margin: 0;
                                        cursor: pointer;
                                    `}
                                    src="/img/icon/more.svg"
                                    alt="스쿨빌런 더보기 이미지"
                                    onClick={() => {
                                        setOpenModifyBox(!openModifyBox);
                                    }}
                                />
                            </div>
                            {openModifyBox && (
                                <SpeechBubble>
                                    <SpeechBubbleContent onClick={() => deleteBoard(board.id)}>
                                        삭제하기
                                    </SpeechBubbleContent>
                                    <SpeechBubbleContent onClick={() => editBoard()}>
                                        수정하기
                                    </SpeechBubbleContent>
                                </SpeechBubble>
                            )}
                        </div>
                    ) : null}
                </>
            </BoardBox>
            <BoardContents
                dangerouslySetInnerHTML={{ __html: textToTag(board.contents) }}
            ></BoardContents>
            <div
                css={css`
                    margin-bottom: 2em;
                    text-align: center;
                `}
            >
                {board.board_image
                    ? board.board_image.map((item: any) => {
                          return (
                              <figure key={item.id}>
                                  <img
                                      css={css`
                                          max-width: 60%;
                                          ${media.sm`max-width:90%;`}
                                      `}
                                      src={`${item.path}?q=60`}
                                      alt={`스쿨빌런 ${board.title} 이미지`}
                                  />
                              </figure>
                          );
                      })
                    : null}
            </div>
            <BoardBox
                css={css`
                    margin-bottom: 2em;
                `}
            >
                {board.hash_tags
                    ? board.hash_tags.map((tag: any) => {
                          return <Tag key={tag.id}># {tag.tag}</Tag>;
                      })
                    : null}
            </BoardBox>
            <div
                css={css`
                    ${FlexBox('', 'flex-start', '')};
                    margin-bottom: 2em;
                `}
            >
                <div
                    css={css`
                        ${FlexBox()};
                        margin-right: 1em;
                        cursor: pointer;
                    `}
                    onClick={() => likeBoard(board.id)}
                >
                    {boardLikeId > 0 ? (
                        <IconSm
                            css={css`
                                margin-right: 0.3em;
                            `}
                            src="/img/icon/like_purple.svg"
                            alt="스쿨빌런 좋아요 이미지"
                        />
                    ) : (
                        <IconSm
                            css={css`
                                margin-right: 0.3em;
                            `}
                            src="/img/icon/like.svg"
                            alt="스쿨빌런 좋아요 이미지"
                        />
                    )}
                    <div
                        css={css`
                            color: ${Color.gray200};
                        `}
                    >
                        {board.board_like_count}
                    </div>
                </div>
                <div
                    css={css`
                        ${FlexBox()};
                    `}
                >
                    <IconSm
                        css={css`
                            margin-right: 0.3em;
                        `}
                        src="/img/icon/comment.svg"
                        alt="스쿨빌런 댓글 이미지"
                    />
                    <div
                        css={css`
                            color: ${Color.gray200};
                        `}
                    >
                        {board.comment_count}
                    </div>
                </div>
            </div>
        </>
    ) : (
        <>
            <SkeletonBoard />
        </>
    );
};
export default Board;
