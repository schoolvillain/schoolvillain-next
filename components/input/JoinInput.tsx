import React from 'react';
import styled from '@emotion/styled';
import { MarkdownMd } from 'styles/Markdown.style';
import { Color } from 'styles/Color.style';

const Input = styled.input`
    ${MarkdownMd()};
    width: 100%;
    border: 0;
    border-bottom: 1px solid ${Color.purple200};
    outline: none;
    padding: 10px 0 10px 0;
    margin-bottom: 10px;
`;

interface propsType {
    type: string;
    value: string;
    onChange: any;
    placeholder: string;
}

const JoinInput: React.FC<propsType> = ({ type, value, onChange, placeholder }) => {
    return <Input type={type} value={value} onChange={onChange} placeholder={placeholder} />;
};

export default JoinInput;
