/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { SkeletonColor } from 'styles/Util';

const SkeletonBoard = () => {
    return (
        <>
            <div
                css={css`
                    width: 80%;
                    height: 2em;
                    ${SkeletonColor()};
                    margin-bottom: 1em;
                `}
            />
            <div
                css={css`
                    margin-bottom: 2em;
                `}
            >
                <div
                    css={css`
                        width: 5em;
                        height: 1.2em;
                        ${SkeletonColor()};
                        margin-bottom: 0.2em;
                    `}
                />
                <div
                    css={css`
                        width: 15em;
                        height: 1.2em;
                        ${SkeletonColor()};
                    `}
                />
            </div>

            <div
                css={css`
                    width: 100%;
                    height: 10em;
                    ${SkeletonColor()};
                    margin-bottom: 1em;
                `}
            />

            <div
                css={css`
                    margin-bottom: 1em;
                `}
            >
                {[1, 2, 3].map((tag: any) => {
                    return (
                        <div
                            css={css`
                                display: inline-block;
                                width: 3em;
                                height: 1em;
                                ${SkeletonColor()};
                                margin-right: 0.5em;
                            `}
                            key={tag}
                        />
                    );
                })}
            </div>

            <div
                css={css`
                    margin-bottom: 1em;
                `}
            >
                <div
                    css={css`
                        display: inline-block;
                        width: 5em;
                        height: 1.2em;
                        ${SkeletonColor()};
                        margin-right: 0.5em;
                    `}
                />
                <div
                    css={css`
                        display: inline-block;
                        width: 5em;
                        height: 1.2em;
                        ${SkeletonColor()};
                    `}
                />
            </div>
        </>
    );
};
export default SkeletonBoard;
