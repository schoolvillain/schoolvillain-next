import React from 'react';
import styled from '@emotion/styled';

const Input = styled.textarea`
    width: 100%;
    background-color: transparent;
    border: 0;
    resize: none;
    outline: none;
`;

interface propsType {
    value: string;
    onChange: any;
    placeholder: string;
}

const ReplyInput: React.FC<propsType> = ({ value, onChange, placeholder }) => {
    return <Input rows={1} value={value} onChange={onChange} placeholder={placeholder}></Input>;
};
export default ReplyInput;
