import React from 'react';
import styled from '@emotion/styled';
import { MarkdownLg } from 'styles/Markdown.style';
import { Color } from 'styles/Color.style';

interface IBoardInfo {
    userName?: string;
    created: string;
    viewCount: number;
}

function BoardInfo(props): JSX.Element {
    return <div></div>;
}

export default BoardInfo;

const StyledBoardTitle = styled.div`
    ${MarkdownLg(Color.black, 600)};
    word-break: break-word;
`;
