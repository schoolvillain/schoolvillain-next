/** @jsx jsx */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { FlexBox } from 'styles/Layout.style';
import { media } from 'styles/Media.style';
import { Color } from 'styles/Color.style';
import { MarkdownBase, MarkdownLg, MarkdownMd } from 'styles/Markdown.style';
import { authLoginFailure, authLoginRequest, authLoginSuccess } from 'reducers/auth';
import axios from 'axios';
import { jsx, css } from '@emotion/core';
import JoinInput from 'components/input/JoinInput';
import { ErrorMsg } from 'styles/Util';
import Link from 'next/link';
import SEO from 'components/SEO/SEO';

function LoginPage(): JSX.Element {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading.login);

    const [email, setEmail] = useState('');
    const [emailCheck, setEmailCheck] = useState(false);
    const [emailErr, setEmailErr] = useState('');

    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [passwordErr, setPasswordErr] = useState('');

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,8}$/i;
        setEmail(e.target.value);

        if (!emailRegex.test(e.target.value)) {
            setEmailErr('이메일 형식에 일치하지 않습니다.');
            setEmailCheck(false);
        } else {
            setEmailErr('');
            setEmailCheck(true);
        }
    };
    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/i;
        setPassword(e.target.value);

        if (!PasswordRegex.test(e.target.value)) {
            setPasswordErr('숫자와 영문자 및 특수문자를 포함한 8~16자이어야 합니다.');
            setPasswordCheck(false);
        } else {
            setPasswordErr('');
            setPasswordCheck(true);
        }
    };

    const onEnter = (e: React.KeyboardEvent) => {
        if (emailCheck && passwordCheck) {
            if (e.key === 'Enter') {
                goLogin();
            }
        }
    };

    //API
    const goLogin = async () => {
        dispatch(authLoginRequest());
        try {
            const csrf = await axios({
                method: 'GET',
                url: '/sanctum/csrf-cookie',
            });
            if (csrf.status === 204) {
                const response = await axios({
                    method: 'POST',
                    url: '/api/user/login',
                    data: {
                        email: email,
                        password: password,
                    },
                });
                if (response.status === 200) {
                    sessionStorage.setItem('logged', 'true');
                    window.location.href = '/';
                    dispatch(authLoginSuccess());
                }
            }
        } catch (err) {
            if (err.response.status === 422) {
                setEmailCheck(false);
                setEmailErr('존재하지 않는 이메일입니다.');
            } else if (err.response.status === 400) {
                setPasswordCheck(false);
                setPasswordErr('패스워드가 일치하지 않습니다.');
            } else {
                setPasswordCheck(false);
                setPasswordErr('다시 입력해주세요.');
            }
            dispatch(authLoginFailure());
        }
    };

    return (
        <>
            <SEO
                title="로그인 | 스쿨빌런"
                description="스쿨빌런 로그인 페이지입니다."
                keywords="로그인 스쿨빌런 로그인 페이지"
            />
            <LoginSection>
                <LoginContainer>
                    <div
                        css={css`
                            ${MarkdownLg(Color.purple200, 700)};
                            margin-bottom: 3em;
                            text-align: center;
                        `}
                    >
                        로그인
                    </div>
                    <LoginTitle>E-MAIL</LoginTitle>
                    <JoinInput
                        type="text"
                        value={email}
                        onChange={changeEmail}
                        placeholder="이메일을 입력해주세요."
                    />
                    <ErrorMsg
                        css={css`
                            margin-bottom: 1em;
                        `}
                        visible={emailErr.length > 0}
                    >
                        {emailErr}
                    </ErrorMsg>

                    <LoginTitle>PASSWORD</LoginTitle>
                    <Input
                        type="password"
                        value={password}
                        onChange={changePassword}
                        placeholder="패스워드를 입력해주세요."
                        onKeyPress={(e: React.KeyboardEvent) => onEnter(e)}
                    />
                    <ErrorMsg
                        css={css`
                            margin-bottom: 1em;
                        `}
                        visible={passwordErr.length > 0}
                    >
                        {passwordErr}
                    </ErrorMsg>

                    <Button enabled={emailCheck && passwordCheck} onClick={goLogin}>
                        {loading ? (
                            <img
                                css={css`
                                    height: 2em;
                                    width: 2em;
                                `}
                                src="/img/icon/white_spinner.gif"
                            />
                        ) : (
                            '로그인'
                        )}
                    </Button>

                    <div
                        css={css`
                            margin-top: 3em;
                            text-align: right;
                        `}
                    >
                        <p
                            css={css`
                                margin-bottom: 1em;
                            `}
                        >
                            <Link href="/join/agreement">
                                <a>아직 회원가입을 안 하셨나요?</a>
                            </Link>
                        </p>
                        <p>
                            <Link href="/send/email">
                                <a>패스워드를 잊어버리셨나요?</a>
                            </Link>
                        </p>
                    </div>
                </LoginContainer>
            </LoginSection>
        </>
    );
}

export default LoginPage;

const LoginSection = styled.section`
    ${FlexBox('column')};
    min-height: 100vh;
`;
const LoginContainer = styled.article`
    width: 500px;
    ${media.md`width:400px;`}
    ${media.sm`width:90%;`}
`;
const LoginTitle = styled.div`
    ${MarkdownBase(Color.purple200, 600)};
`;

interface buttonProps {
    enabled: boolean;
}

const Button = styled.button`
    ${MarkdownMd(Color.white)};
    width: 100%;
    height: 45px;
    border-radius: 0.3em;
    box-shadow: 0 1.5px 2.5px 0 rgba(0, 0, 0, 0.16);
    margin-top: 30px;
    ${(props: buttonProps) =>
        props.enabled
            ? `pointer-events:initial;
     background-color:${Color.purple200};
    `
            : `pointer-events:none;
     background-color:${Color.purple100};
    `}
    &:hover {
        background-color: ${Color.purple300};
    }
`;

const Input = styled.input`
    ${MarkdownMd()};
    width: 100%;
    border: 0;
    border-bottom: 1px solid ${Color.purple200};
    outline: none;
    padding: 10px 0 10px 0;
    margin-bottom: 10px;
`;
