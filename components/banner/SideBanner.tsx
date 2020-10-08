/** @jsx jsx */
import React, { memo } from 'react';
import Link from 'next/link';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { SkeletonColor } from 'styles/Util';

interface propsType {
    banner: any;
}

const BannerImg = styled.img`
    width: 100%;
    margin-top: 1em;
    margin-bottom: 1em;
    display: block;
    cursor: pointer;
    border-radius: 0.3em;
`;

const SideBanner: React.FC<propsType> = ({ banner }) => {
    return (
        <section>
            {banner.length > 0 ? (
                banner.map((item: any, index: number) => {
                    return item.banner_count > 0 ? (
                        <a href={item.banner[0].link} key={index}>
                            <BannerImg src={item.banner[0].path} />
                        </a>
                    ) : (
                        index === 0 && (
                            <Link href="/banner/apply" key={index}>
                                <a>
                                    <BannerImg src="/img/banner/side_banner.png" />
                                </a>
                            </Link>
                        )
                    );
                })
            ) : (
                <div
                    css={css`
                        width: 100%;
                        height: 5em;
                        ${SkeletonColor()};
                    `}
                />
            )}
        </section>
    );
};

export default memo(SideBanner);
