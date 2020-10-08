/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { SkeletonColor } from 'styles/Util';
import { Grid } from 'styles/Layout.style';
import { media } from 'styles/Media.style';

const SkeletonNotification = () => {
    return (
        <>
            {[1, 2].map((item, index) => {
                return (
                    <div
                        key={index}
                        css={css`
                            padding: 1.5em;
                            ${media.sm`padding:1.5em 0;`} ${Grid(25, 75)};
                        `}
                    >
                        <div>
                            <div
                                css={css`
                                    margin-right: 0.8em;
                                    text-align: center;
                                    ${SkeletonColor()};
                                    height: 1.5em;
                                    height: 3em;
                                `}
                            />
                        </div>
                        <div>
                            <div
                                css={css`
                                    margin-bottom: 0.3em;
                                    ${SkeletonColor()};
                                    height: 1em;
                                    width: 100%;
                                `}
                            />
                            <div
                                css={css`
                                    ${SkeletonColor()};
                                    height: 1em;
                                    width: 30%;
                                `}
                            />
                        </div>
                    </div>
                );
            })}
        </>
    );
};
export default SkeletonNotification;
