import React from 'react';
import styled from '@emotion/styled';
import { Color } from 'styles/Color.style';
import { IconSm } from 'styles/Icon.style';

interface IBoardActionBox {
    onClickLike: () => void;
    isLike: boolean;
    likesCount: number;
    commentsCount: number;
}

function BoardActionBox({
    onClickLike,
    isLike,
    likesCount,
    commentsCount,
}: IBoardActionBox): JSX.Element {
    return (
        <StyledActionBox>
            <StyledButton onClick={onClickLike}>
                <StyledIcon
                    src={isLike ? '/img/icon/like_purple.svg' : '/img/icon/like.svg'}
                    alt="스쿨빌런 좋아요 이미지"
                />
                {likesCount}
            </StyledButton>
            <span>
                <StyledIcon src="/img/icon/comment.svg" alt="스쿨빌런 댓글 이미지" />
                <span>{commentsCount}</span>
            </span>
        </StyledActionBox>
    );
}

export default BoardActionBox;

const StyledActionBox = styled.div`
    margin-bottom: 2em;
    color: ${Color.gray200};
`;

const StyledButton = styled.button`
    margin-right: 1em;
    color: ${Color.gray200};
    font-family: 'NanumSquare', sans-serif;
    font-size: 16px;
    font-weight: 400;
`;

const StyledIcon = styled(IconSm)`
    margin-right: 0.3em;
    display: inline-block;
    vertical-align: middle;
`;
