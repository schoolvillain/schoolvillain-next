/** @jsx jsx */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import axios from 'axios';
import Agreement from 'components/join/Agreement';
import ServiceRule from 'components/join/ServiceRule';
import PrivacyRule from 'components/join/PrivacyRule';
import School from 'components/join/School';
import Email from 'components/join/Email';
import Password from 'components/join/Password';
import PasswordConfirm from 'components/join/PasswordConfirm';
import ProgressBar from 'components/progress/ProgressBar';
import SEO from 'components/SEO/SEO';
import { MarkdownLg } from 'styles/Markdown.style';
import { Color } from 'styles/Color.style';
import { FlexBox } from 'styles/Layout.style';
import { media } from 'styles/Media.style';
import { jsx, css } from '@emotion/core';

function JoinPage() {
    let joinComponent;
    //동의
    const [age, setAge] = useState(false);
    const [agree, setAgree] = useState(false);
    const [agreementCheck, setAgreementCheck] = useState(false);
    const [agreementErr, setAgreementErr] = useState('');

    //학교
    const [school, setSchool] = useState('');
    const [grade, setGrade] = useState('');
    const [schoolCheck, setSchoolCheck] = useState(false);
    const [schoolErr, setSchoolErr] = useState('');

    //이메일
    const [email, setEmail] = useState('');
    const [emailCheck, setEmailCheck] = useState(false);
    const [emailErr, setEmailErr] = useState('');

    //비밀번호
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [passwordErr, setPasswordErr] = useState('');

    //비밀번호 확인
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordConfirmCheck, setPasswordConfirmCheck] = useState(false);
    const [passwordConfirmErr, setPasswordConfirmErr] = useState('');

    const router = useRouter();
    const { status } = router.query;

    // 유효성 검사
    const checkedAgreement = (age: boolean, agree: boolean) => {
        setAge(age);
        setAgree(agree);
        setAgreementCheck(age && agree);
    };
    const selectSchool = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;

        setSchool(value);

        if (value !== '' && grade !== '') {
            setSchoolCheck(true);
            setSchoolErr('');
        } else {
            setSchoolCheck(false);
            setSchoolErr('학교와 학년을 선택해주세요.');
        }
    };
    const selectGrade = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;

        setGrade(value);

        if (value !== '' && school !== '') {
            setSchoolCheck(true);
            setSchoolErr('');
        } else {
            setSchoolCheck(false);
            setSchoolErr('학교와 학년을 선택해주세요.');
        }
    };

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,8}$/i;
        setEmail(value);

        if (!emailRegex.test(value)) {
            setEmailErr('이메일 형식에 일치하지 않습니다.');
            setEmailCheck(false);
        } else {
            setEmailErr('');
            setEmailCheck(true);
        }
    };
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

    //api 통신
    const goAgreement = () => {
        router.push('/join/school');
    };
    const goSchool = () => {
        router.push('/join/email');
    };
    const goEmail = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/user/email/check',
                data: {
                    email: email,
                },
            });
            if (response.status === 200) {
                //console.log(response);
                router.push('/join/password');
            }
        } catch (err) {
            if (err.response.status === 422) {
                setEmailCheck(false);
                setEmailErr('이미 존재하는 이메일입니다.');
            } else {
                setEmailCheck(false);
                setEmailErr('다시 입력해주세요.');
            }
        }
    };
    const goPassword = () => {
        router.push('/join/confirm');
    };
    const goPasswordConfirm = async () => {
        try {
            const csrf = await axios({
                method: 'GET',
                url: '/sanctum/csrf-cookie',
            });
            if (csrf.status === 204) {
                const response = await axios({
                    method: 'POST',
                    url: '/api/user/register',
                    data: {
                        email: email,
                        password: passwordConfirm,
                        school_type: school,
                        grade: grade,
                    },
                });
                console.log(response);
                if (response.status === 200) {
                    sessionStorage.setItem('logged', String(true));
                    window.location.href = '/';
                }
            }
        } catch (err) {
            console.log(err.response);
            if (err.response.status === 422) {
                if (err.response.data.errors.grade || err.response.data.errors.school_type) {
                    setSchoolCheck(false);
                    setSchoolErr('학교와 학년을 다시 선택해주세요.');
                    router.push('/join/school');
                }
                if (err.response.data.erros.email) {
                    setEmailCheck(false);
                    setEmailErr('이메일을 다시 입력해주세요.');
                    router.push('/join/email');
                }
            } else {
                setAgreementCheck(false);
                setAgreementErr('다시 입력해주세요.');
                router.push('/join/agreement');
            }
        }
    };

    if (status === 'agreement') {
        joinComponent = (
            <Agreement
                goNext={goAgreement}
                age={age}
                agree={agree}
                checkedAgreement={checkedAgreement}
                err={agreementErr}
                enabled={agreementCheck}
            />
        );
    } else if (status === 'service-rule') {
        joinComponent = <ServiceRule />;
    } else if (status === 'privacy-rule') {
        joinComponent = <PrivacyRule />;
    } else if (status === 'school') {
        joinComponent = (
            <School
                goPrev={() => router.push('/join/agreement')}
                goNext={goSchool}
                school={school}
                grade={grade}
                selectSchool={selectSchool}
                selectGrade={selectGrade}
                err={schoolErr}
                enabled={schoolCheck}
            />
        );
    } else if (status === 'email') {
        joinComponent = (
            <Email
                goPrev={() => router.push('/join/school')}
                goNext={goEmail}
                email={email}
                changeEmail={changeEmail}
                err={emailErr}
                enabled={emailCheck}
            />
        );
    } else if (status === 'password') {
        joinComponent = (
            <Password
                goPrev={() => router.push('/join/email')}
                goNext={goPassword}
                password={password}
                changePassword={changePassword}
                err={passwordErr}
                enabled={passwordCheck}
            />
        );
    } else if (status === 'confirm') {
        joinComponent = (
            <PasswordConfirm
                goPrev={() => router.push('/join/password')}
                goNext={goPasswordConfirm}
                password={passwordConfirm}
                changePasswordConfirm={changePasswordConfirm}
                err={passwordConfirmErr}
                enabled={passwordConfirmCheck}
            />
        );
    }

    return (
        <>
            <SEO
                title="회원가입 | 스쿨빌런"
                description="스쿨빌런 회원가입 페이지입니다."
                keywords="회원가입 스쿨빌런 가입페이지"
            />
            <JoinSection>
                <ProgressBar
                    step={
                        (status === 'agreement' && 1) ||
                        (status === 'service-rule' && 1) ||
                        (status === 'privacy-rule' && 1) ||
                        (status === 'school' && 2) ||
                        (status === 'email' && 3) ||
                        (status === 'password' && 4) ||
                        (status === 'confirm' && 5)
                    }
                />
                <JoinContainer>
                    <div
                        css={css`
                            ${MarkdownLg(Color.purple200, 700)};
                            margin-bottom: 3em;
                            text-align: center;
                        `}
                    >
                        회원가입
                    </div>
                    {joinComponent}
                </JoinContainer>
            </JoinSection>
        </>
    );
}

export default JoinPage;

const JoinSection = styled.section`
    min-height: 100vh;
    ${FlexBox('column')};
`;
const JoinContainer = styled.article`
    min-width: 500px;
    max-width: 1000px;
    ${media.md`min-width:400px; max-width:80%;`}
    ${media.sm`min-width:90%; max-width:90%;`}
`;
