/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import { jsx, css } from '@emotion/core';
import { Color } from 'styles/Color.style';
import axios from 'axios';
import styled from '@emotion/styled';
import {
    MarkdownBase,
    MarkdownLg,
    MarkdownMd,
    MarkdownSm,
    MarkdownXl,
} from 'styles/Markdown.style';
import { FlexBox, onlyMobile } from 'styles/Layout.style';
import { ErrorMsg } from 'styles/Util';
import { media } from 'styles/Media.style';
import Identification from './Identification';

const Greeting = styled.div`
    ${MarkdownBase(Color.purple200, 500)};
    padding: 0.5em 0;
    //box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    text-align: center;
    border-radius: 0.3em;
    background: ${Color.purple100};
`;
const ProfileTitle = styled.div`
    ${MarkdownMd('', 600)};
    margin-bottom: 1em;
`;

const Input = styled.input`
    ${MarkdownBase()};
    width: calc(100% - 1em);
    border-radius: 0.5em;
    border: 1px solid ${Color.gray100};
    outline: none;
    height: 45px;
    padding-left: 1em;
`;

const ProfileBox = styled.div`
    padding: 3em 0;
    //border-top: 1px solid ${Color.gray100};
    ${media.sm`padding:2em 0`}
`;

const NicknameBox = styled.div`
    display: grid;
    grid-template-columns: 90% 10%;
    ${media.md`grid-template-columns: 80% 20%;`}
`;
interface buttonProps {
    enabled: boolean;
}

const Button = styled.button`
    padding: 0 2em;
    ${MarkdownMd(Color.white)};
    height: 45px;
    border-radius: 0.3em;
    margin-top: 30px;
    ${(props: buttonProps) =>
        props.enabled
            ? css`
                  pointer-events: initial;
                  background-color: ${Color.purple200};
              `
            : css`
                  pointer-events: none;
                  background-color: ${Color.purple100};
              `}
    &:hover {
        background-color: ${Color.purple300};
    }
`;

const EditButton = styled.button`
    padding: 0 1em;
    height: 45px;
    ${MarkdownBase(Color.white)};
    border-radius: 0.3em;
    ${media.sm`margin-left:0;`}

    ${(props: buttonProps) =>
        props.enabled
            ? css`
                  pointer-events: initial;
                  background-color: ${Color.purple200};
              `
            : css`
                  pointer-events: none;
                  background-color: ${Color.purple100};
              `}
  &:hover {
        background-color: ${Color.purple300};
    }
`;

const Label = styled.label`
    display: block;
    ${MarkdownBase(Color.gray200, 500)};
    margin-bottom: 0.5em;
`;
const GrayButton = styled.button`
    ${MarkdownSm(Color.gray200)};
    background-color: ${Color.gray100};
    padding: 0.5em 1em;
    margin-left: 1em;
    border-radius: 0.3em;
    &:hover {
        background-color: #e1e1e1;
    }
`;

interface propsType {
    user: any;

    nickname: string;
    nicknameErr: string;
    nicknameCheck: boolean;
    changeNickname: any;

    email: string;

    currentPassword: string;
    currentPasswordErr: string;
    currentPasswordCheck: boolean;
    changeCurrentPassword: any;

    newPassword: string;
    newPasswordErr: string;
    newPasswordCheck: boolean;
    changeNewPassword: any;

    newPasswordConfirm: string;
    newPasswordConfirmErr: string;
    newPasswordConfirmCheck: boolean;
    changeNewPasswordConfirm: any;

    editNickname: any;
    editPassword: any;
    goLogout: any;
    goWithdrawal: any;
}

const Profile: React.FC<propsType> = ({
    user,
    nickname,
    nicknameErr,
    nicknameCheck,
    changeNickname,

    email,

    currentPassword,
    currentPasswordErr,
    currentPasswordCheck,
    changeCurrentPassword,

    newPassword,
    newPasswordErr,
    newPasswordCheck,
    changeNewPassword,

    newPasswordConfirm,
    newPasswordConfirmErr,
    newPasswordConfirmCheck,
    changeNewPasswordConfirm,

    editNickname,
    editPassword,
    goLogout,
    goWithdrawal,
}) => {
    return (
        <section>
            <Greeting>
                <span
                    css={css`
                        position: relative;
                        vertical-align: middle;
                        font-size: 24px;
                        margin-right: 0.5em;
                    `}
                >
                    👋
                </span>
                <span
                    css={css`
                        ${MarkdownBase(Color.purple300, 600)}
                    `}
                >
                    {email}
                </span>{' '}
                님, 반갑습니다.
            </Greeting>

            <ProfileBox
                css={css`
                    ${FlexBox()}
                `}
            >
                <div
                    css={css`
                        width: 350px;
                    `}
                >
                    <Identification user={user} />
                </div>
            </ProfileBox>

            <ProfileBox>
                <ProfileTitle>빌런 닉네임</ProfileTitle>
                <NicknameBox>
                    <div
                        css={css`
                            margin-right: 1em;
                        `}
                    >
                        <Input
                            type="text"
                            value={nickname}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeNickname(e)}
                            placeholder="닉네임을 입력해주세요"
                        />
                        <ErrorMsg visible={nicknameErr.length > 0}>{nicknameErr}</ErrorMsg>
                    </div>
                    <EditButton enabled={nicknameCheck} onClick={editNickname}>
                        변경
                    </EditButton>
                </NicknameBox>
            </ProfileBox>

            <ProfileBox>
                <ProfileTitle>빌런 패스워드</ProfileTitle>
                <div
                    css={css`
                        margin-bottom: 1em;
                    `}
                >
                    <Label>현재 패스워드</Label>
                    <Input
                        type="password"
                        value={currentPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            changeCurrentPassword(e)
                        }
                        placeholder="현재 비밀번호를 입력해주세요"
                    />
                    <ErrorMsg visible={currentPasswordErr.length > 0}>
                        {currentPasswordErr}
                    </ErrorMsg>
                </div>
                <div
                    css={css`
                        margin-bottom: 1em;
                    `}
                >
                    <Label>새로운 패스워드</Label>
                    <Input
                        type="password"
                        value={newPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeNewPassword(e)}
                        placeholder="새로운 비밀번호를 입력해주세요"
                    />
                    <ErrorMsg visible={newPasswordErr.length > 0}>{newPasswordErr}</ErrorMsg>
                </div>
                <div>
                    <Label>새로운 패스워드 확인</Label>
                    <Input
                        type="password"
                        value={newPasswordConfirm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            changeNewPasswordConfirm(e)
                        }
                        placeholder="새로운 비밀번호를 입력해주세요"
                    />
                    <ErrorMsg visible={newPasswordConfirmErr.length > 0}>
                        {newPasswordConfirmErr}
                    </ErrorMsg>
                </div>
                <div
                    css={css`
                        text-align: center;
                    `}
                >
                    <Button
                        enabled={
                            currentPasswordCheck && newPasswordCheck && newPasswordConfirmCheck
                        }
                        onClick={editPassword}
                    >
                        패스워드 변경
                    </Button>
                </div>
            </ProfileBox>

            <ProfileBox
                css={css`
                    text-align: right;
                    border-top: 1px solid ${Color.gray100};
                `}
            >
                <GrayButton onClick={goWithdrawal}>회원탈퇴</GrayButton>
                <GrayButton onClick={goLogout}>로그아웃</GrayButton>
            </ProfileBox>
        </section>
    );
};
export default Profile;
