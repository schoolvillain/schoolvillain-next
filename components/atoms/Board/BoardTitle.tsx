import React from 'react';
import styled from '@emotion/styled';
import { MarkdownLg } from 'styles/Markdown.style';
import { Color } from 'styles/Color.style';

interface IBoardTitle {
    children: string;
}

function BoardTitle({ children }: IBoardTitle): JSX.Element {
    return <StyledBoardTitle>{children}</StyledBoardTitle>;
}

export default BoardTitle;

const StyledBoardTitle = styled.div`
    ${MarkdownLg(Color.black, 600)};
    margin-bottom: 1em;
    word-break: break-word;
`;
