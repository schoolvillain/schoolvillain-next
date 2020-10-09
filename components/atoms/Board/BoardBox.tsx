/** @jsx jsx */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { IconSm } from 'styles/Icon.style';
import { Color } from 'styles/Color.style';
import { MarkdownBase, MarkdownSm } from 'styles/Markdown.style';
import { media } from 'styles/Media.style';

interface IBoardBox {
    userName?: string;
    created: string;
    viewCount: number;
    isMine: boolean;
    onClickDelete: () => void;
    onClickEdit: () => void;
}

function BoardBox({
    userName,
    created,
    viewCount,
    isMine,
    onClickDelete,
    onClickEdit,
}: IBoardBox): JSX.Element {
    const [openModifyBox, setOpenModifyBox] = useState(false);
    return (
        <StyledBoardBox>
            <div>
                <p>{userName || '익명'}</p>
                <p>
                    <span>{created}</span>
                    <StyledDivider>|</StyledDivider>
                    <StyledIcon src="/img/icon/view.svg" alt="스쿨빌런 조회수 이미지" />
                    <span>{viewCount}</span>
                </p>
            </div>
            <>
                {isMine && (
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
                                <SpeechBubbleContent onClick={onClickDelete}>
                                    삭제하기
                                </SpeechBubbleContent>
                                <SpeechBubbleContent onClick={onClickEdit}>
                                    수정하기
                                </SpeechBubbleContent>
                            </SpeechBubble>
                        )}
                    </div>
                )}
            </>
        </StyledBoardBox>
    );
}

export default BoardBox;

const StyledBoardBox = styled.div`
    margin-bottom: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid ${Color.gray100};
    ${MarkdownBase(Color.gray200)};
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

const StyledDivider = styled.span`
    padding: 0 0.5em;
`;

const StyledIcon = styled(IconSm)`
    margin-right: 0.3em;
`;
