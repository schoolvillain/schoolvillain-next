/** @jsx jsx */
import styled from '@emotion/styled';
import { FlexBox } from 'styles/Layout.style';
import { MarkdownBase, MarkdownMd } from 'styles/Markdown.style';
import { jsx, css } from '@emotion/core';
import { Color } from 'styles/Color.style';
import { media } from 'styles/Media.style';
import React from 'react';
import { FadeIn, FadeOut } from 'styles/Animate.style';

interface sectionProp {
    openModal: boolean;
}

const ModalSection = styled.section<sectionProp>`
    position: fixed;
    z-index: 3;
    background-color: rgba(255, 255, 255, 0.72);
    //backdrop-filter: blur(4px);
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    ${FlexBox()};
    ${(props: sectionProp) =>
        props.openModal
            ? css`
                  animation: ${FadeIn} 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
              `
            : css`
                  animation: ${FadeOut} 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
                  display: none;
              `}
`;
const ModalBox = styled.div`
    width: 400px;
    border-radius: 0.3em;
    background-color: white;
    box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.18), 0 2px 4px 0 rgba(0, 0, 0, 0.11),
        inset 0 0 0 1px rgba(255, 255, 255, 0.51);
    ${media.sm`
    width:320px;
  `}
`;

const ModalHeader = styled.header`
    ${MarkdownMd('', 700)};
    font-size: 22px;
    font-weight: 700;
    text-align: center;
    margin-top: 1.5em;
    margin-bottom: 1em;
    ${media.sm`
    font-size:18px;
  `}
`;
const ModalBody = styled.div`
    ${MarkdownBase()};
    margin-bottom: 1.5em;
    text-align: center;
`;
const ModalFooter = styled.footer`
    padding: 1em;
    text-align: center;
`;
const Button = styled.button`
  ${MarkdownMd(Color.white)};
  width:100%;
  padding:0.5em;
  border-radius: 0.3em;
  background-color:${Color.purple200}; 
}
  &:hover{
    background-color: ${Color.purple300};
  }
`;

interface propsType {
    openModal: boolean;
    confirmModal: any;
    title: string;
    contents: string;
    buttonName: string;
}

const Modal: React.FC<propsType> = ({ openModal, confirmModal, title, contents, buttonName }) => {
    return (
        <ModalSection openModal={openModal}>
            <ModalBox>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody dangerouslySetInnerHTML={{ __html: contents }} />
                <ModalFooter>
                    <Button onClick={confirmModal}>{buttonName}</Button>
                </ModalFooter>
            </ModalBox>
        </ModalSection>
    );
};

export default Modal;
