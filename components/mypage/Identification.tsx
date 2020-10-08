/** @jsx jsx */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Color } from 'styles/Color.style';
import Link from 'next/link';
import { jsx, css } from '@emotion/core';
import { FlexBox } from 'styles/Layout.style';
import { MarkdownBase, MarkdownLg, MarkdownMd, MarkdownSm } from 'styles/Markdown.style';
import SkeletonIdentification from 'components/loading/SkeletonIdentification';
import { useSelector } from 'react-redux';
import { Blink } from 'styles/Animate.style';

const ProfileContainer = styled.div`
    position: relative;
    width: 100%;
    height: 250px;
    transform-style: preserve-3d;
    transition: transform 1s;
    &:hover {
        transform: rotateY(180deg);
    }
`;
const ProfileSection = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 0.3em;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    &.back {
        ${FlexBox('column', 'space-around', '')};
        transform: rotateY(180deg);
        background-color: ${Color.white};
    }
`;
const ProfileTitle = styled.div`
    border-radius: 0.3em 0.3em 0 0;
    background-image: url('/img/bg/identification.png');
    background-repeat: no-repeat;
    background-size: cover;
    padding: 0 1em;
    margin-bottom: 1em;
    height: 35%;
    ${FlexBox('row', 'space-between', 'center')};
`;

const ProfileName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  ${MarkdownLg(Color.white, 500)};
}
`;
const ProfileBody = styled.div`
    padding: 0 1em;
    ${MarkdownSm()};
    height: 7.5em;
`;

const ProfileFooter = styled.div`
    padding: 1.2em;
    text-align: center;
`;

interface btnProps {
    isFull: boolean;
}

const AuthBtn = styled.button<btnProps>`
    width: 100%;
    padding: 1em;
    border-radius: 0.3em;
    text-align: center;
    ${(props: btnProps) =>
        props.isFull
            ? css`
                  background-color: ${Color.purple200};
                  color: ${Color.white};
                  &:hover {
                      background-color: ${Color.purple300};
                  }
                  margin-bottom: 1em;
              `
            : css`
                  border: 1px solid ${Color.purpl200};
                  background-color: ${Color.white};
                  color: ${Color.purple200};
                  &:hover {
                      background-color: ${Color.purple100};
                  }
              `};
`;

const Identification = ({ user }: any) => {
    const logged = useSelector((state) => state.auth.logged);
    return (
        <>
            {logged ? (
                user ? (
                    <ProfileContainer>
                        <ProfileSection>
                            <ProfileTitle>
                                <div
                                    css={css`
                                        width: 100%;
                                        margin-right: 0.3em;
                                        overflow: hidden;
                                    `}
                                >
                                    <ProfileName>{user.name || '익명'}</ProfileName>
                                </div>
                                <img
                                    css={css`
                                        width: 4em;
                                    `}
                                    src="/img/badge/badge.svg"
                                />
                            </ProfileTitle>
                            <ProfileBody>
                                <div
                                    css={css`
                                        ${MarkdownLg('', 500)};
                                        margin-bottom: 0.5em;
                                    `}
                                >
                                    스쿨빌런학교
                                </div>
                                <div>학생 ID : {user.email}</div>
                                <div>유효기간 : 고등학교 졸업식</div>
                            </ProfileBody>

                            <ProfileFooter
                                css={css`
                                    ${MarkdownSm(Color.gray200)};
                                `}
                            >
                                위 학생은 본교 학생임을 인증합니다.
                            </ProfileFooter>
                        </ProfileSection>
                        <ProfileSection className="back">
                            <div
                                css={css`
                                    text-align: center;
                                    padding: 1.2em;
                                    margin-bottom: 1em;
                                    ${MarkdownMd('', 500)};
                                    border-bottom: 1px solid ${Color.gray100};
                                `}
                            >
                                유의사항
                            </div>
                            <ProfileBody>
                                <li
                                    css={css`
                                        ${FlexBox('', 'Flex-start', '')};
                                        margin-bottom: 0.5em;
                                    `}
                                >
                                    <div
                                        css={css`
                                            margin-right: 1em;
                                        `}
                                    >
                                        ▶
                                    </div>
                                    <div>당신만의 학생다움을 보여주세요.</div>
                                </li>
                                <li
                                    css={css`
                                        ${FlexBox('', 'Flex-start', '')};
                                        margin-bottom: 0.5em;
                                    `}
                                >
                                    <div
                                        css={css`
                                            margin-right: 1em;
                                        `}
                                    >
                                        ▶
                                    </div>
                                    <div>바르고 고운 말을 사용해주세요.</div>
                                </li>
                                <li
                                    css={css`
                                        ${FlexBox('', 'Flex-start', '')};
                                        margin-bottom: 0.5em;
                                    `}
                                >
                                    <div
                                        css={css`
                                            margin-right: 1em;
                                        `}
                                    >
                                        ▶
                                    </div>
                                    <div>타인에게 양도할 수 없습니다.</div>
                                </li>
                                <li
                                    css={css`
                                        ${FlexBox('', 'Flex-start', '')};
                                    `}
                                >
                                    <div
                                        css={css`
                                            margin-right: 1em;
                                        `}
                                    >
                                        ▶
                                    </div>
                                    <div>타인이 접속한 경우, 로그아웃해주세요.</div>
                                </li>
                            </ProfileBody>
                            <ProfileFooter
                                css={css`
                                    ${MarkdownMd('', 500)};
                                `}
                            >
                                스쿨빌런학교짱
                            </ProfileFooter>
                        </ProfileSection>
                    </ProfileContainer>
                ) : (
                    <SkeletonIdentification />
                )
            ) : (
                <>
                    <Link href="/join/agreement">
                        <div
                            css={css`
                                padding: 1em 0;
                                background: linear-gradient(70deg, #6700a7, #090088);
                                margin-bottom: 1em;
                                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
                                text-align: center;
                                border-radius: 0.3em;
                                ${MarkdownMd(Color.white)};
                                ${FlexBox()}
                            `}
                        >
                            <span
                                css={css`
                                    font-weight: 700;
                                    margin-right: 0.3em;
                                `}
                            >
                                스쿨빌런 가입
                            </span>{' '}
                            아직인가요?
                            <img
                                css={css`
                                    width: 1.2em;
                                    margin-left: 0.8em;
                                    animation: 1s infinite ${Blink};
                                `}
                                src="/img/icon/arrow-left_white.svg"
                            />
                        </div>
                    </Link>
                    <Link href="/login">
                        <div
                            css={css`
                                padding: 1em 0;
                                background: linear-gradient(70deg, #ff138b, #ffc407);
                                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
                                text-align: center;
                                border-radius: 0.3em;
                                ${MarkdownMd(Color.white)}
                            `}
                        >
                            <span
                                css={css`
                                    font-weight: 700;
                                `}
                            >
                                스쿨빌런 로그인
                            </span>{' '}
                            하러가기
                        </div>
                    </Link>
                </>
            )}
        </>
    );
};
export default Identification;
