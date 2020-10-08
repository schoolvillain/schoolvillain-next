import React from 'react';
import styled from '@emotion/styled';
import { Color } from 'styles/Color.style';
import { MarkdownMd } from 'styles/Markdown.style';
import { css } from '@emotion/core';

interface buttonProps {
    enabled: boolean;
    isEmpty: boolean;
}

const Button = styled.button`
    ${MarkdownMd(Color.white)};
    width: 100%;
    height: 45px;
    border-radius: 0.3em;
    box-shadow: 0 1.5px 2.5px 0 rgba(0, 0, 0, 0.16);
    margin-top: 30px;
    ${(props: buttonProps) =>
        props.isEmpty
            ? css`
                  background-color: ${Color.white};
                  border: 1px solid ${Color.purple200};
                  color: ${Color.purple200};
                  &:hover {
                      background-color: ${Color.purple100};
                  }
              `
            : css`
                  background-color: ${Color.purple200};
                  color: ${Color.white};
                  &:hover {
                      background-color: ${Color.purple300};
                  }

                  ${props.enabled
                      ? css`
                            pointer-events: initial;
                            background-color: ${Color.purple200};
                        `
                      : css`
                            pointer-events: none;
                            background-color: ${Color.purple100};
                        `}
              `};
`;

interface propsType {
    goPage: any;
    enabled?: boolean;
    name: string;
    isEmpty?: boolean;
}

const JoinButton: React.FC<propsType> = ({ goPage, enabled, name, isEmpty }) => {
    return (
        <Button enabled={enabled || false} isEmpty={isEmpty || false} onClick={() => goPage()}>
            {name}
        </Button>
    );
};
export default JoinButton;
