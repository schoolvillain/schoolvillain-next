/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/core';
import { Color } from 'styles/Color.style';
import { MarkdownSm } from 'styles/Markdown.style';

const Progress = styled.div`
    width: 100%;
    height: 10px;
    background-color: ${Color.gray100};
    position: fixed;
    top: 4em;
`;

interface statusProps {
    step: number;
}

const Status = styled.div<statusProps>`
    background: linear-gradient(
        90deg,
        #ec82ff,
        #d51cd8 17%,
        #bd67ff 34%,
        #8802ef 51%,
        #ec82ff 68%,
        #d51cd8 85%,
        #bd67ff
    );
    animation: progress 2s linear infinite;
    background-size: 300% 100%;
    @keyframes progress {
        0% {
            background-position: 100%;
        }
        100% {
            background-position: 0;
        }
    }
    transition: width 0.6s ease;
    ${(props: statusProps) => css`
        width: calc(${props.step} * 20%);
    `};
    height: 100%;
`;

interface propsType {
    step: number;
}

const ProgressBar: React.FC<propsType> = ({ step }) => {
    return (
        <Progress>
            <Status step={step - 1} />
            <div
                css={css`
                    ${MarkdownSm(Color.purple200)};
                    text-align: center;
                `}
            >
                {(step - 1) * 20}%
            </div>
        </Progress>
    );
};

export default ProgressBar;
