/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import { jsx, css } from '@emotion/core';
import { useDispatch, useSelector } from 'react-redux';
import { searchKeyword } from 'reducers/search';
import { Section } from 'styles/Layout.style';
import Result from 'components/search/Result';
import styled from '@emotion/styled';
import { Color } from 'styles/Color.style';
import { MarkdownLg } from 'styles/Markdown.style';

function SearchPage() {
    const dispatch = useDispatch();
    const word = useSelector((state) => state.search.keyword);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        setKeyword(word);
        return () => {
            setKeyword(word);
        };
    }, [word]);

    const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setKeyword(value);
    };
    const onSearchEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            dispatch(searchKeyword(keyword));
        }
    };

    return (
        <section
            css={css`
                ${Section()};
            `}
        >
            <SearchInput
                type="text"
                value={keyword}
                placeholder="스쿨빌런 검색"
                onChange={changeKeyword}
                onKeyPress={(e: React.KeyboardEvent) => onSearchEnter(e)}
            />
            <Result />
        </section>
    );
}

export default SearchPage;

const SearchInput = styled.input`
    background-image: url('/img/icon/search_purple.svg');
    background-repeat: no-repeat;
    background-position: calc(100%);
    background-size: 20px;
    width: 100%;
    border: 0;
    padding: 0.5em 0;
    border-bottom: 1px solid ${Color.purple200};
    ${MarkdownLg()};
`;
