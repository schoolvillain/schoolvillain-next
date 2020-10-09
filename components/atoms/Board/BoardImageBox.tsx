import React from 'react';
import styled from '@emotion/styled';
import { media } from 'styles/Media.style';

interface IBoardImageBox {
    imageList: { id: number; path: string }[];
    alt: string;
}

function BoardImageBox({ imageList, alt }: IBoardImageBox): JSX.Element {
    return (
        <StyledImageBox>
            {imageList.map(({ id, path }, index) => (
                <figure key={id}>
                    <StyledImage src={`${path}?q=60`} alt={`${alt} ${index}`} />
                </figure>
            ))}
        </StyledImageBox>
    );
}

export default BoardImageBox;

const StyledImageBox = styled.div`
    margin-bottom: 2em;
    text-align: center;
`;

const StyledImage = styled.img`
    max-width: 60%;
    ${media.sm`max-width:90%;`}
`;
