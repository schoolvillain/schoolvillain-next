/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import axios from 'axios';
import SEO from 'components/SEO/SEO';
import { Color } from 'styles/Color.style';
import { MarkdownBase, MarkdownLg, MarkdownMd } from 'styles/Markdown.style';
import JoinInput from 'components/input/JoinInput';
import { ErrorMsg } from 'styles/Util';
import Modal from 'components/modal/Modal';
import { FlexBox } from 'styles/Layout.style';
import { media } from 'styles/Media.style';

function ResetPasswordPage() {
    const [code, setCode] = useState('');
    //비밀번호
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [passwordErr, setPasswordErr] = useState('');

    //비밀번호 확인
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordConfirmCheck, setPasswordConfirmCheck] = useState(false);
    const [passwordConfirmErr, setPasswordConfirmErr] = useState('');

    //모달
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setCode(location.search.substring(6, location.search.length));
    }, []);

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/i;
        setPassword(value);

        if (!PasswordRegex.test(value)) {
            setPasswordErr('숫자와 영문자 및 특수문자를 포함한 8~16자이어야 합니다.');
            setPasswordCheck(false);
        } else {
            setPasswordErr('');
            setPasswordCheck(true);
        }
    };
    const changePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setPasswordConfirm(value);

        if (value !== password) {
            setPasswordConfirmErr('패스워드가 일치하지 않습니다.');
            setPasswordConfirmCheck(false);
        } else {
            setPasswordConfirmErr('');
            setPasswordConfirmCheck(true);
        }
    };

    const onEnter = (e: React.KeyboardEvent) => {
        if (passwordCheck && passwordConfirmCheck) {
            if (e.key === 'Enter') {
                resetPassword();
            }
        }
    };
    const resetPassword = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/user/reset/pw',
                data: {
                    code: code,
                    new_password: passwordConfirm,
                },
            });
            console.log(response);
            if (response.status === 201) {
                setOpenModal(true);
            }
        } catch (err) {
            setPasswordConfirmErr('패스워드를 다시 입력해주세요.');
            setPasswordConfirmCheck(false);
            console.log(err.response);
        }
    };

    const confirmModal = () => {
        location.href = '/login';
    };
    return (
        <>
            <SEO
                title="패스워드 재설정 | 스쿨빌런"
                description="스쿨빌런 패스워드 재설정 페이지입니다."
                keywords="스쿨빌런 패스워드 재설정 페이지"
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
                        패스워드 재설정
                    </div>

                    <LoginTitle>NEW PASSWORD</LoginTitle>
                    <JoinInput
                        type="password"
                        value={password}
                        onChange={changePassword}
                        placeholder="패스워드를 입력해주세요."
                    />
                    <ErrorMsg
                        css={css`
                            margin-bottom: 1em;
                        `}
                        visible={passwordErr.length > 0}
                    >
                        {passwordErr}
                    </ErrorMsg>

                    <LoginTitle>NEW PASSWORD CHECK</LoginTitle>
                    <Input
                        type="password"
                        value={passwordConfirm}
                        onChange={changePasswordConfirm}
                        placeholder="패스워드를 입력해주세요."
                        onKeyPress={(e: React.KeyboardEvent) => onEnter(e)}
                    />
                    <ErrorMsg visible={passwordConfirmErr.length > 0}>
                        {passwordConfirmErr}
                    </ErrorMsg>

                    <Button
                        css={css`
                            margin-bottom: 1em;
                        `}
                        enabled={passwordCheck && passwordConfirmCheck}
                        onClick={resetPassword}
                    >
                        재설정하기
                    </Button>
                </LoginContainer>
            </LoginSection>

            <Modal
                openModal={openModal}
                confirmModal={confirmModal}
                title="패스워드 변경완료"
                contents="입력하신 패스워드로 변경되었습니다."
                buttonName="로그인 하러가기"
            />
        </>
    );
}

export default ResetPasswordPage;

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
