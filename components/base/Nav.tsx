import React from 'react';
import styled from '@emotion/styled';
import { Color } from 'styles/Color.style';

const NavSection = styled.nav`
    position: absolute;
    background-color: ${Color.white};
    padding: 1em;
`;

interface propsType {
    isNav: boolean;
}

const Nav: React.FC<propsType> = ({ isNav }) => {
    return (
        <>
            {isNav ? (
                <NavSection>
                    <div>내 정보 수정</div>
                    <div>내가 쓴 글</div>
                </NavSection>
            ) : null}
        </>
    );
};

export default Nav;
