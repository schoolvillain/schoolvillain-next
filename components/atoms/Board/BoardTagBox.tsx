import React from 'react';
import { Tag } from 'styles/Util';
import styled from '@emotion/styled';

interface IBoardTagBox {
    tagList: { id: number; tag: string }[];
}

function BoardTagBox({ tagList }: IBoardTagBox): JSX.Element {
    return (
        <StyledTagBox>
            {tagList?.map(({ id, tag }) => (
                <Tag key={id}># {tag}</Tag>
            ))}
        </StyledTagBox>
    );
}

export default BoardTagBox;

const StyledTagBox = styled.div`
    margin-bottom: 2em;
`;
