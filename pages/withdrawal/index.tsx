/** @jsx jsx */
import React, { useState } from 'react';
import { jsx, css } from '@emotion/core';
import axios from 'axios';
import { MarkdownBase, MarkdownLg, MarkdownMd } from 'styles/Markdown.style';
import { Color } from 'styles/Color.style';
import styled from '@emotion/styled';
import { FlexBox, Section } from 'styles/Layout.style';
import { media } from 'styles/Media.style';

function WithDrawal() {
    const [agree, setAgree] = useState(false);
    const CheckedAgree = () => {
        setAgree(!agree);
    };
    const onWithdrawal = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/user/delete',
            });
            // console.log(response);
            if (response.status === 200) {
                location.href = '/';
                sessionStorage.removeItem('logged');
            }
        } catch (err) {
            console.log(err);
            console.log(err.response);
        }
    };

    return (
        <AgreementSection>
            <AgreementContainer>
                <div
                    css={css`
                        ${MarkdownLg(Color.purple200, 700)}
                    `}
                >
                    회원탈퇴
                </div>
            </AgreementContainer>

            <AgreementContainer
                css={css`
                    border-top: 1px solid ${Color.gray100};
                    border-bottom: 1px solid ${Color.gray100};
                `}
            >
                <AgreementList>해당 계정은 탈퇴할 경우 복구가 불가능합니다.</AgreementList>
                <AgreementList>
                    회원정보는 모두 삭제되며, 삭제된 데이터는 복구되지 않습니다.
                </AgreementList>
                <AgreementList>
                    작성한 게시글 및 댓글은 자동으로 삭제되지 않으니, 반드시 탈퇴 전 비공개 또는
                    삭제하시기 바랍니다.
                </AgreementList>
                <AgreementList>
                    탈퇴 후 회원정보가 삭제되어 본인 여부를 확인할 수 없으니 게시글을 임의로
                    삭제해드릴 수 없습니다.
                </AgreementList>
            </AgreementContainer>

            <AgreementContainer>
                <AgreementLabel htmlFor="b">
                    <div>
                        <CheckBox type="checkbox" id="b" checked={agree} onChange={CheckedAgree} />
                        <FakeCheckBox checked={agree} />
                    </div>
                    <AgreementTitle>안내 사항을 모두 확인하였으며, 이에 동의합니다.</AgreementTitle>
                </AgreementLabel>
            </AgreementContainer>

            <AgreementContainer
                css={css`
                    text-align: center;
                `}
            >
                <Button enabled={agree} onClick={onWithdrawal}>
                    탈퇴하기
                </Button>
            </AgreementContainer>
        </AgreementSection>
    );
}

export default WithDrawal;

const AgreementSection = styled.section`
    ${Section()};
`;
const AgreementContainer = styled.div`
    padding: 2em 0;
`;
const AgreementLabel = styled.label`
    cursor: pointer;
    ${FlexBox('', '', 'center')};
`;
const AgreementTitle = styled.div`
    ${MarkdownMd()};
    margin-left: 1em;
    ${media.sm`margin-left:0.3em;`}
`;
const CheckBox = styled.input`
    display: none;
`;
const AgreementList = styled.li`
    margin-bottom: 3em;
    &:nth-last-of-type(1) {
        margin-bottom: 0;
    }
    &::before {
        color: ${Color.purple200};
        content: '✔';
        margin-right: 1em;
    }
`;
type FakeCheckBoxProps = {
    checked: boolean;
};
const FakeCheckBox = styled.div`
    ${MarkdownBase(Color.white)};
    border-radius: 50%;
    background-color: ${(props: FakeCheckBoxProps) =>
        props.checked ? Color.purple200 : Color.purple100};
    width: 30px;
    height: 30px;
    text-align: center;
    background-image: url(${require('../../../assets/img/icon/check.svg')});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
    ${media.sm`width:25px; height:25px;`}
`;

interface buttonProps {
    enabled: boolean;
}

const Button = styled.button`
    padding: 0.5em 2em;
    border-radius: 0.3em;
    ${MarkdownMd(Color.white)};
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
