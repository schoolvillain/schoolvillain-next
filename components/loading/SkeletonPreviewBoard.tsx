/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Color } from 'styles/Color.style';
import React from 'react';
import { media } from 'styles/Media.style';
import { SkeletonColor } from 'styles/Util';

const SkeletonPreviewBoard = () => {
    return (
        <>
            {[1, 2].map((item: number) => {
                return (
                    <article
                        key={item}
                        css={css`
                            min-height: 150px;
                            padding: 1.8em 5%;
                            background-color: ${Color.white};
                            margin-bottom: 1.5em;
                            box-shadow: 0 3px 5px #00000021;
                        `}
                    >
                        <div
                            css={css`
                                display: flex;
                                justify-content: space-between;
                                margin-bottom: 1em;
                            `}
                        >
                            <div
                                css={css`
                                    width: 75%;
                                    margin-right: 1em;
                                `}
                            >
                                <div
                                    css={css`
                                        width: 90%;
                                        height: 2em;
                                        ${SkeletonColor()};
                                        margin-bottom: 0.5em;
                                    `}
                                />
                                <div
                                    css={css`
                                        width: 100%;
                                        height: 1em;
                                        ${SkeletonColor()};
                                    `}
                                />
                            </div>
                            <div
                                css={css`
                                    width: 20%;
                                    height: 5em;
                                    ${SkeletonColor()};
                                    ${media.sm`width:25%; height:4em;`}
                                `}
                            />
                        </div>

                        <div
                            css={css`
                                margin-bottom: 1em;
                            `}
                        >
                            {[1, 2, 3].map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        css={css`
                                            display: inline-block;
                                            width: 3em;
                                            height: 1.5em;
                                            ${SkeletonColor()};
                                            margin-right: 0.5em;
                                        `}
                                    />
                                );
                            })}
                        </div>

                        <div
                            css={css`
                                display: flex;
                                justify-content: space-between;
                                margin-top: 1em;
                            `}
                        >
                            <div>
                                <div
                                    css={css`
                                        display: inline-block;
                                        width: 4em;
                                        height: 1.2em;
                                        ${SkeletonColor()};
                                        margin-right: 0.5em;
                                    `}
                                />
                                <div
                                    css={css`
                                        display: inline-block;
                                        width: 4em;
                                        height: 1.2em;
                                        ${SkeletonColor()};
                                    `}
                                />
                            </div>
                            <div>
                                <div
                                    css={css`
                                        display: inline-block;
                                        width: 4em;
                                        height: 1.2em;
                                        ${SkeletonColor()};
                                        margin-right: 0.5em;
                                    `}
                                />
                                <div
                                    css={css`
                                        display: inline-block;
                                        width: 4em;
                                        height: 1.2em;
                                        ${SkeletonColor()};
                                    `}
                                />
                            </div>
                        </div>
                    </article>
                );
            })}
        </>
    );
};

export default SkeletonPreviewBoard;
