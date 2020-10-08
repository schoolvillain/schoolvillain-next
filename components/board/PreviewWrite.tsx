/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Color } from 'styles/Color.style';
import { FlexBox, onlyPc } from 'styles/Layout.style';
import Write from 'components/board/Write';
import { Cursor, TypingMobile, TypingPc } from 'styles/Animate.style';
import { media } from 'styles/Media.style';
import { MarkdownMd, MarkdownSm, MarkdownXl } from 'styles/Markdown.style';

const WriteSection = styled.section`
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    padding: 2em;
    border-radius: 0.3em;
    border: 1px solid ${Color.gray100};
    ${media.sm`padding:1.8em 5%;`}//&:hover{
  //  background-color:#f5f5f5;
  //}
`;
const WriteContainer = styled.div`
    // ${FlexBox('', 'flex-start', 'center')};
    cursor: text;
    //box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    padding: 1em;
    border-radius: 0.5em;
    background-color: ${Color.gray100};
    //border: 1px solid ${Color.gray100};
    color: ${Color.gray150};
`;

const WriteTxt = styled.span`
    overflow: hidden;
    border-left: 1px solid ${Color.gray200};
    white-space: nowrap;
    animation: ${Cursor} 1s step-end infinite, ${TypingPc} 3s steps(20, end) infinite;
    ${media.sm`
    animation: ${TypingMobile} 3s steps(20, end) infinite,${Cursor} 1s step-end infinite ;
  `}
`;
const PreviewWrite = () => {
    const [writeModal, setWriteModal] = useState(false);
    const goWrite = () => {
        if (sessionStorage.getItem('logged')) {
            if (window.screen.width > 480) {
                setWriteModal(true);
            } else {
                window.location.href = '/write';
            }
        } else {
            window.location.href = '/login';
        }
    };
    const isOpen = (open: boolean) => {
        setWriteModal(open);
    };
    return (
        <>
            {writeModal && <Write isOpen={isOpen} />}
            <WriteSection onClick={goWrite}>
                <div
                    css={css`
                        ${FlexBox('', 'flex-start', 'center')};
                        margin-bottom: 1em;
                    `}
                >
                    {/*<img css={css`width:2em; height:2em; margin-right: 0.8em;`} src={require('../../../assets/img/icon/edit.svg')}/>*/}
                    <span
                        css={css`
                            font-size: 24px;
                            margin-right: 0.5em;
                        `}
                    >
                        ✏️
                    </span>
                    <div>
                        <div
                            css={css`
                                ${MarkdownSm(Color.gray200)};
                                ${onlyPc()};
                            `}
                        >
                            게시글 작성
                        </div>

                        <div
                            css={css`
                                ${MarkdownMd('', 600)};
                            `}
                        >
                            오늘, 무슨 일이 있으셨나요?
                        </div>
                    </div>
                </div>
                <WriteContainer>
                    <WriteTxt>어떤 일인지 자세하게 알려주세요.</WriteTxt>
                    {/*<div css={css`margin-left:1em;`}>*/}
                    {/*    <button css={css`width:3em; height:3em; padding:0.8em; border-radius: 5em; background-color:${Color.purple200}; ${FlexBox()};`}><img*/}
                    {/*        css={css`width:100%; height:100%;`}*/}
                    {/*        src={require('../../../assets/img/icon/edit_white.svg')}/></button>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                </WriteContainer>
            </WriteSection>
        </>
    );
};

export default PreviewWrite;
