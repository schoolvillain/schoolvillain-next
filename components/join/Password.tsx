import React, { useState } from 'react';
import JoinButton from 'components/button/JoinButton';
import styled from '@emotion/styled';
import { MarkdownBase, MarkdownSm } from 'styles/Markdown.style';
import { Color } from 'styles/Color.style';
import JoinInput from 'components/input/JoinInput';
import { HalfGrid } from 'styles/Layout.style';

const JoinTitle = styled.div`
    ${MarkdownBase(Color.purple200, 600)};
`;
type ErrorMsgProps = {
    visible: boolean;
};
const ErrorMsg = styled.div<ErrorMsgProps>`
    ${MarkdownSm(Color.red)};
    visibility: ${(props: ErrorMsgProps) => (props.visible ? 'visible' : 'hidden')};
`;

interface propsType {
    goPrev: any;
    goNext: any;
    password: string;
    changePassword: any;
    err: string;
    enabled: boolean;
}

const Password: React.FC<propsType> = ({
    goPrev,
    goNext,
    password,
    changePassword,
    err,
    enabled,
}) => {
    return (
        <>
            <JoinTitle>PASSWORD</JoinTitle>
            <JoinInput
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => changePassword(e)}
                placeholder="패스워드를 입력해주세요."
            />
            <ErrorMsg visible={err.length > 0}>{err}</ErrorMsg>
            <HalfGrid>
                <JoinButton goPage={goPrev} isEmpty={true} enabled={true} name="이전" />
                <JoinButton goPage={goNext} enabled={enabled} name="다음" />
            </HalfGrid>
        </>
    );
};
export default Password;
