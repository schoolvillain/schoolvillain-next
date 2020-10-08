import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { FlexBox } from 'styles/Layout.style';
import JoinButton from 'components/button/JoinButton';
import { MarkdownBase, MarkdownMd, MarkdownSm } from 'styles/Markdown.style';
import { Color } from 'styles/Color.style';
import { media } from 'styles/Media.style';

const JoinTitle = styled.div`
    ${MarkdownBase(Color.purple200, 600)};
`;
type AgreementContainerProps = {
    border?: number;
};
const AgreementContainer = styled.section`
    padding: 15px 0 15px 0;
    border-bottom: ${(props: AgreementContainerProps) => props.border || 0}px solid
        ${Color.purple200};
`;
const AgreementLabel = styled.label`
    cursor: pointer;
    ${FlexBox('', 'space-between', 'center')};
`;
const CheckBox = styled.input`
    display: none;
`;
interface FakeCheckBoxProps {
    checked: boolean;
}
const FakeCheckBox = styled.div`
    ${MarkdownBase(Color.white)};
    border-radius: 50%;
    background-color: ${(props: FakeCheckBoxProps) =>
        props.checked ? Color.purple200 : Color.purple100};
    width: 30px;
    height: 30px;
    text-align: center;
    background-image: url('/img/icon/check.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
    ${media.sm`width:25px; height:25px;`}
`;
const AgreementList = styled.div`
    display: flex;
    flex-direction: column;
    width: 85%;
`;
const AgreementTitle = styled.div`
    ${MarkdownMd()};
    width: 85%;
`;
const AgreementContent = styled.div`
    ${FlexBox('', 'space-between')};
    ${MarkdownBase(Color.gray200)};
    margin-bottom: 10px;
`;
interface ErrorMsgProps {
    visible: boolean;
}
const ErrorMsg = styled.div<ErrorMsgProps>`
    ${MarkdownSm(Color.red)};
    visibility: ${(props: ErrorMsgProps) => (props.visible ? 'visible' : 'hidden')};
`;

interface propsType {
    goNext: any;
    age: boolean;
    agree: boolean;
    checkedAgreement: any;
    err: string;
    enabled: boolean;
}

const Agreement: React.FC<propsType> = ({ goNext, age, agree, checkedAgreement, err, enabled }) => {
    const ageChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        checkedAgreement(!age, agree);
    };
    const agreeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        checkedAgreement(age, !agree);
    };
    return (
        <>
            <JoinTitle>약관동의</JoinTitle>
            <AgreementContainer border={1}>
                <AgreementLabel htmlFor="a">
                    <div>
                        <CheckBox type="checkbox" id="a" checked={age} onChange={ageChecked} />
                        <FakeCheckBox checked={age} />
                    </div>
                    <AgreementTitle>저는 만 14세 이상입니다.</AgreementTitle>
                </AgreementLabel>
            </AgreementContainer>

            <AgreementContainer>
                <AgreementLabel htmlFor="b">
                    <div>
                        <CheckBox type="checkbox" id="b" checked={agree} onChange={agreeChecked} />
                        <FakeCheckBox checked={agree} />
                    </div>
                    <AgreementTitle>전체 동의합니다.</AgreementTitle>
                </AgreementLabel>
            </AgreementContainer>

            <AgreementLabel>
                <div></div>
                <AgreementList>
                    <Link href="/join/service-rule">
                        <AgreementContent>
                            <div>스쿨빌런 이용 약관</div>
                            <div> &gt; </div>
                        </AgreementContent>
                    </Link>

                    <Link href="/join/privacy-rule">
                        <AgreementContent>
                            <div>스쿨빌런 개인정보 처리 방침</div>
                            <div> &gt; </div>
                        </AgreementContent>
                    </Link>
                </AgreementList>
            </AgreementLabel>
            <ErrorMsg visible={err.length > 0}>{err}</ErrorMsg>

            <JoinButton goPage={goNext} enabled={enabled} name="다음" />
        </>
    );
};
export default Agreement;
