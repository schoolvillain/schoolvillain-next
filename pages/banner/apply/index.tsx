/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { FlexBox, onlyMobile, onlyPc, Section } from 'styles/Layout.style';
import styled from '@emotion/styled';
import { media } from 'styles/Media.style';
import { MarkdownLg } from 'styles/Markdown.style';

function Apply() {
    return (
        <ApplySection>
            <ApplyImg
                css={css`
                    ${onlyPc()}
                `}
                src="/img/banner/pc_apply.png"
            />
            <ApplyImg
                css={css`
                    ${onlyMobile()}
                `}
                src="/img/banner/m_apply.png"
            />

            <ApplyFloating>
                <a
                    css={css`
                        width: 100%;
                        text-align: center;
                    `}
                    href="https://pf.kakao.com/_QxakAK"
                    target="_blank"
                >
                    지금 바로 배너등록 신청하기
                </a>
            </ApplyFloating>
        </ApplySection>
    );
}

export default Apply;

const ApplySection = styled.section`
    ${Section};
    ${media.sm`width:100%; margin:0; padding:4em 0;`}
`;
const ApplyImg = styled.img`
    display: block;
    width: 100%;
`;
const ApplyFloating = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 1em 0;
    ${FlexBox()};
    width: 100%;
    border-top: 4px solid #000000;
    background-color: white;
    ${MarkdownLg('', 700)};
    &:hover {
        background-color: #eeeeee;
    }
`;
