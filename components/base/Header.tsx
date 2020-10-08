/** @jsx jsx */
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/core';
import { MarkdownSm } from 'styles/Markdown.style';
import { FlexBox, onlyMobile, onlyPc } from 'styles/Layout.style';
import { media } from 'styles/Media.style';
import { Color } from 'styles/Color.style';
import { useDispatch, useSelector } from 'react-redux';
import Notification from 'components/notification/Notification';
import { searchKeyword } from 'reducers/search';
import { useRouter } from 'next/router';

const HeaderSection = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    background-color: ${Color.white};
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.16);
    z-index: 3;
`;
const HeaderContainer = styled.section`
    ${FlexBox('', 'space-between', 'center')};
    height: 4em;
    width: 95%;
    ${media.sm`width:90%`};
    margin: auto;
`;
const HeaderLogo = styled.div`
    height: 1.2em;
    ${media.md`height:1em`}
`;
const HeaderMenu = styled.div`
    ${FlexBox()};
    text-align: center;
    min-width: fit-content;
`;
const SearchInput = styled.input`
    background-image: url('/img/icon/search.svg');
    background-color: ${Color.gray100};
    background-repeat: no-repeat;
    background-position: calc(100% - 1em);
    background-size: 1em;
    margin-left: 1em;
    width: 13em;
    border-radius: 0.3em;
    border: none;
    //box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    padding: 0.6em 1em;
    transition: width 0.5s;
    ${onlyPc()};
    ${media.md`
      width:10em; 
      background-position: calc(100% - 0.8em);
      padding:0.5em 0.8em;
      margin-left:0.5em;
      margin-right:0.5em;
  `}
    &:focus {
        width: 15em;
        ${media.md`width:11em;`}
    }
`;
const HeaderIcon = styled.figure`
    //background:linear-gradient(0deg,#e7c9ff,#fbf7fd);
    ${FlexBox('row', 'center', 'center')};
    width: 3em;
    height: 3em;
    cursor: pointer;
    ${media.md`width:2.5em; height:2.5em; `}
`;
const Header = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const logged = useSelector((state) => state.auth.logged);
    const word = useSelector((state) => state.search.keyword);
    const count = useSelector((state) => state.notification.count);

    const [openNotification, setOpenNotification] = useState(false);
    const NotificationRef = useRef(null);
    const [keyword, setKeyword] = useState('');
    // const [notificationCount,setNotificationCount]=useState(0);

    useEffect(() => {
        setKeyword(word);
        window.addEventListener('click', (e: React.MouseEvent) => {
            if (NotificationRef.current && !NotificationRef.current.contains(e.target)) {
                setOpenNotification(false);
            }
        });
        return () => {
            window.removeEventListener('click', (e: React.MouseEvent) => {
                if (NotificationRef.current && !NotificationRef.current.contains(e.target)) {
                    setOpenNotification(false);
                }
            });
        };
    }, [word]);

    const goSearch = () => {
        router.push('/search');
    };
    const goNotification = () => {
        if (window.screen.width > 480) {
            setOpenNotification(!openNotification);
        } else {
            router.push('/notification');
        }
    };
    const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setKeyword(value);
    };
    const onSearchEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            location.href = `/result?keyword=${keyword}`;
            dispatch(searchKeyword(keyword));
        }
    };
    return (
        <HeaderSection>
            <HeaderContainer>
                <div
                    css={css`
                        ${FlexBox()}
                    `}
                >
                    <Link href="/">
                        <a>
                            <HeaderLogo>
                                <img
                                    css={css`
                                        height: 100%;
                                    `}
                                    src="/img/icon/logo.svg"
                                />
                            </HeaderLogo>
                        </a>
                    </Link>
                    <SearchInput
                        type="text"
                        value={keyword}
                        placeholder="스쿨빌런 검색"
                        onChange={changeKeyword}
                        onKeyPress={(e: React.KeyboardEvent) => onSearchEnter(e)}
                    />
                    {!logged && (
                        <div
                            css={css`
                                ${onlyMobile()};
                            `}
                        >
                            <HeaderIcon onClick={goSearch}>
                                <img
                                    css={css`
                                        width: 1.5em;
                                    `}
                                    src="/img/icon/search_purple.svg"
                                />
                            </HeaderIcon>
                        </div>
                    )}
                </div>
                <HeaderMenu>
                    {logged ? (
                        <>
                            <div
                                css={css`
                                    margin-right: 0.5em;
                                    ${onlyMobile()};
                                `}
                            >
                                <HeaderIcon onClick={goSearch}>
                                    <img
                                        css={css`
                                            width: 1.5em;
                                        `}
                                        src="/img/icon/search_purple.svg"
                                    />
                                </HeaderIcon>
                            </div>
                            <div
                                css={css`
                                    margin-right: 1em;
                                    ${media.md`margin-right:0.5em;`}
                                `}
                                ref={NotificationRef}
                            >
                                {count > 0 && (
                                    <figcaption
                                        css={css`
                                            position: absolute;
                                            margin-left: 1.8em;
                                            margin-top: 0.3em;
                                            border-radius: 50%;
                                            width: 0.5em;
                                            height: 0.5em;
                                            background-color: ${Color.purple200};
                                        `}
                                    />
                                )}
                                <HeaderIcon onClick={goNotification}>
                                    <img
                                        css={css`
                                            width: 1.5em;
                                        `}
                                        src="/img/icon/notification.svg"
                                    />
                                </HeaderIcon>
                            </div>
                            {openNotification && <Notification />}
                            <Link href="/mypage/profile">
                                <a>
                                    <HeaderIcon>
                                        <img
                                            css={css`
                                                width: 1.4em;
                                            `}
                                            src="/img/icon/profile.svg"
                                        />
                                    </HeaderIcon>
                                </a>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/join/agreement">
                                <a
                                    css={css`
                                        ${MarkdownSm(Color.purple200)};
                                        width: 80px;
                                        ${media.md`width:60px;`};
                                    `}
                                >
                                    회원가입
                                </a>
                            </Link>
                            <Link href="/login">
                                <a
                                    css={css`
                                        background: ${Color.purple200};
                                        ${MarkdownSm(Color.white)};
                                        width: 80px;
                                        ${media.md`width:60px;`};
                                        border: 1px solid ${Color.purple200};
                                        padding: 0.7em 0;
                                        border-radius: 0.3em;
                                    `}
                                >
                                    로그인
                                </a>
                            </Link>
                        </>
                    )}
                </HeaderMenu>
            </HeaderContainer>
        </HeaderSection>
    );
};

export default Header;
