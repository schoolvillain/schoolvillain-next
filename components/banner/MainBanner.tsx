/** @jsx jsx */
import Link from 'next/link';
import React, { memo } from 'react';
import styled from '@emotion/styled';
import { MarkdownSm } from 'styles/Markdown.style';
import { Color } from 'styles/Color.style';
import { jsx, css } from '@emotion/core';
import { media } from 'styles/Media.style';
import { SkeletonColor } from 'styles/Util';

const BannerSection = styled.section`
    margin-top: 1em;
    margin-bottom: 1em;
    border-radius: 0.3em;
`;
const BannerImg = styled.img`
    display: block;
    position: relative;
    vertical-align: middle;
    width: 100%;
    border-radius: 0.3em;
`;
const BannerTag = styled.div`
    padding: 0.5em;
    ${MarkdownSm(Color.white, 500)};
    background-color: rgba(0, 0, 0, 0.18);
    text-align: center;
    box-shadow: 0 3px 5px #00000021;
`;

interface propsType {
    banner: any;
}

const MainBanner: React.FC<propsType> = ({ banner }) => {
    return banner ? (
        <BannerSection>
            {banner.banner_count < 0 ? (
                <a href={banner.banner[0].link} target="_blank">
                    <BannerImg src={banner.banner[0].path} />
                </a>
            ) : (
                <Link href="/banner/apply">
                    <a>
                        <BannerImg src="/img/banner/main_banner.svg" />
                    </a>
                </Link>
            )}
        </BannerSection>
    ) : (
        <div
            css={css`
                margin-top: 1em;
                width: 100%;
                height: 14em;
                ${media.sm`height:8em;`} ${SkeletonColor()};
            `}
        />
    );
};
export default memo(MainBanner);
