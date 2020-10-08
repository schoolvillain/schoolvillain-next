/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { FlexBox } from 'styles/Layout.style';
import { SkeletonColor } from 'styles/Util';

const SkeletonIdentification = () => {
    return (
        <div
            css={css`
                margin-bottom: 1em;
                height: 250px;
                box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.16);
                text-align: center;
            `}
        >
            <div
                css={css`
                    ${FlexBox('', 'space-between', 'center')};
                    ${SkeletonColor()};
                    width: 100%;
                    height: 35%;
                    margin-bottom: 0.5em;
                `}
            />
            <div
                css={css`
                    padding: 1em;
                `}
            >
                <div
                    css={css`
                        ${SkeletonColor()};
                        width: 60%;
                        height: 2em;
                        margin-bottom: 1em;
                    `}
                />
                <div
                    css={css`
                        ${SkeletonColor()};
                        width: 70%;
                        height: 1em;
                        margin-bottom: 0.3em;
                    `}
                />
                <div
                    css={css`
                        ${SkeletonColor()};
                        width: 70%;
                        height: 1em;
                        margin-bottom: 1.5em;
                    `}
                />
                <div
                    css={css`
                        ${SkeletonColor()};
                        width: 100%;
                        height: 1em;
                    `}
                />
            </div>
        </div>
    );
};
export default SkeletonIdentification;
