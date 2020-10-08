import React, { useState } from 'react';
import JoinButton from 'components/button/JoinButton';
import styled from '@emotion/styled';
import { Color } from 'styles/Color.style';
import { MarkdownSm, MarkdownBase } from 'styles/Markdown.style';
import JoinInput from 'components/input/JoinInput';
import { ErrorMsg } from 'styles/Util';
import { css } from '@emotion/core';
import { HalfGrid } from 'styles/Layout.style';

const JoinTitle = styled.div`
    ${MarkdownBase(Color.purple200, 600)};
`;

interface propsType {
    goPrev: any;
    goNext: any;
    email: string;
    changeEmail: any;
    err: string;
    enabled: any;
}
const Email: React.FC<propsType> = ({ goPrev, goNext, email, changeEmail, err, enabled }) => {
    return (
        <>
            <JoinTitle>E-MAIL</JoinTitle>
            <JoinInput
                type="text"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeEmail(e)}
                placeholder="이메일을 입력해주세요."
            />
            <ErrorMsg visible={err.length > 0}>{err}</ErrorMsg>
            <HalfGrid>
                <JoinButton goPage={goPrev} isEmpty={true} enabled={true} name="이전" />
                <JoinButton goPage={goNext} enabled={enabled} name="다음" />
            </HalfGrid>
        </>
    );
};
export default Email;
