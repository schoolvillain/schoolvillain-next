import React from 'react';
import styled from '@emotion/styled';
import { Color } from 'styles/Color.style';
import { MarkdownBase } from 'styles/Markdown.style';
import {
    BoardTitle,
    BoardBox,
    BoardImageBox,
    BoardTagBox,
    BoardActionBox,
} from 'components/atoms/Board';

interface IBoard {
    id: number;
    title: string;
    created_at: string;
    user: {
        name: string;
    };
    board_view_log_count: number;
    board_like_count: number;
    is_mine: boolean;
    create_time_ago: string;
    contents: string;
    board_image: { id: number; path: string }[];
    hash_tags: { id: number; tag: string }[];
    comment_count: number;
}

interface propsType {
    board: IBoard;
    likeBoard: (id: number) => void;
    boardLikeId: number;
    editBoard: (id: number) => void;
    deleteBoard: (id: number) => void;
}

const Board: React.FC<propsType> = ({
    board: {
        id,
        title,
        user: { name: userName },
        board_view_log_count: viewCount,
        board_like_count: likesCount,
        is_mine: isMine,
        create_time_ago: createdTime,
        contents,
        board_image: imageList,
        hash_tags: tagList,
        comment_count: commentsCount,
    },
    likeBoard,
    boardLikeId,
    editBoard,
    deleteBoard,
}) => {
    return (
        <>
            <BoardTitle>{title}</BoardTitle>
            <BoardBox
                userName={userName}
                created={createdTime}
                viewCount={viewCount}
                isMine={isMine}
                onClickDelete={() => deleteBoard(id)}
                onClickEdit={() => editBoard(id)}
            />
            <BoardContents dangerouslySetInnerHTML={{ __html: textToTag(contents) }} />
            <BoardImageBox imageList={imageList} alt={`스쿨빌런 ${title} 이미지`} />
            <BoardTagBox tagList={tagList} />
            <BoardActionBox
                onClickLike={() => likeBoard(id)}
                isLike={boardLikeId > 0}
                likesCount={likesCount}
                commentsCount={commentsCount}
            />
        </>
    );
};
export default Board;

const textToTag = (str: string) => {
    const newLineRegex = /\n/g;
    const urlRegex = /(https?:\/\/.*?)([.!?;,])?(\n|\s+|"|$)/g;
    str = str
        .replace(urlRegex, `<a href="$1" style="color:${Color.blue200};" target="_blank" >$1</a>`)
        .replace(newLineRegex, '<br />');
    return str;
};

const BoardContents = styled.div`
    ${MarkdownBase(Color.black, 400)};
    word-break: break-word;
    margin-bottom: 1em;
    line-height: 1.7em;
    min-height: 5em;
`;
