/** @jsx jsx */
import styled from '@emotion/styled';
import { FlexBox, Section } from 'styles/Layout.style';
import { jsx, css } from '@emotion/core';
import { Color } from 'styles/Color.style';
import React from 'react';
import { MarkdownBase, MarkdownMd, MarkdownSm } from 'styles/Markdown.style';
import { Tag } from 'styles/Util';
import { IconBase } from 'styles/Icon.style';

const WriteSection = styled.section`
    margin-top: 6em;
    ${Section()};
`;
const WriteContainer = styled.div`
    width: 100%;
`;

interface buttonProps {
    enabled: boolean;
}

const Button = styled.button`
    ${MarkdownMd(Color.white)};
    width: 100%;
    height: 45px;
    border-radius: 0.3em;
    margin-top: 30px;
    ${(props: buttonProps) =>
        props.enabled
            ? `pointer-events:initial;
     background-color:${Color.purple200};
    `
            : `pointer-events:none;
     background-color:${Color.purple100};
    `}
    &:hover {
        background-color: ${Color.purple300};
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    border: 0;
    ${MarkdownBase()};
    resize: none;
    outline: none;
`;

const Input = styled.input`
    width: 100%;
    border: 0;
    ${MarkdownBase()};
    outline: none;
`;
const FileInput = styled.input`
    display: none;
`;
interface IFaKeFileInput {
    previewImgCount: number;
}
const FakeFileInput = styled.label<IFaKeFileInput>`
    display: inline-block;
    width: 100%;
    height: 130px;
    border-radius: 0.3em;
    ${FlexBox('column')};
    ${MarkdownSm(Color.gray200)};
    background-color: ${Color.gray100};
    cursor: pointer;
    &::after {
        margin-top: 1em;
        ${(props: IFaKeFileInput) =>
            css`
                content: '${props.previewImgCount}/6';
            `};
    }
    &:hover {
        background-color: #e1e1e1;
    }
`;
const PreviewImg = styled.div`
    width: 100%;
    height: 130px;
    display: flex;
    position: relative;
    top: 0;
`;
const Preview = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1em;
    text-align: right;
`;
const DelButton = styled.button`
    background-color: ${Color.gray100};
    ${MarkdownSm(Color.gray200)};
    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;
    position: absolute;
    z-index: 2;
    margin-top: -10px;
    margin-left: -13px;
    &:hover {
        background-color: #e1e1e1;
    }
`;

interface propsType {
    title: string;
    changeTitle: any;

    contents: string;
    changeContents: any;

    tag: string;
    tagList: any;
    changeTag: any;
    onEnter: any;
    deleteTag: any;

    loadImg: any;
    deleteImg: any;
    previewList: string[];

    loading: boolean;

    upload: any;
}

const PageWrite: React.FC<propsType> = ({
    title,
    changeTitle,
    contents,
    changeContents,
    tag,
    tagList,
    changeTag,
    onEnter,
    deleteTag,
    loadImg,
    deleteImg,
    previewList,
    loading,
    upload,
}) => {
    return (
        <WriteSection>
            <WriteContainer>
                <div
                    css={css`
                        padding: 1em 0;
                        border-bottom: 1px solid ${Color.gray100};
                    `}
                >
                    <Input
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeTitle(e)}
                        placeholder="제목을 입력해주세요."
                    />
                </div>
                <div
                    css={css`
                        padding: 1em 0;
                        border-bottom: 1px solid ${Color.gray100};
                    `}
                >
                    <TextArea
                        rows={10}
                        value={contents}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => changeContents(e)}
                        placeholder="내용을 입력해주세요."
                    />
                </div>
                <div
                    css={css`
                        padding: 1em 0;
                        border-bottom: 1px solid ${Color.gray100};
                    `}
                >
                    <Preview>
                        <FileInput
                            type="file"
                            id="img"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => loadImg(e)}
                            accept="image/jpg, image/png, image/jpeg, image/gif"
                            multiple
                        />
                        {previewList.length > 0
                            ? previewList.map((preview: any, index: number) => {
                                  return (
                                      <figure
                                          css={css`
                                              position: relative;
                                          `}
                                          key={index}
                                      >
                                          <DelButton onClick={() => deleteImg(index)}>
                                              <img
                                                  css={css`
                                                      width: 50%;
                                                  `}
                                                  src="/img/icon/close.svg"
                                                  alt="스쿨빌런 삭제 이미지"
                                              />
                                          </DelButton>
                                          <PreviewImg>
                                              <img
                                                  css={css`
                                                      width: 100%;
                                                      height: 100%;
                                                      border-radius: 0.3em;
                                                  `}
                                                  src={preview}
                                                  alt={`스쿨빌런 게시판 이미지`}
                                              />
                                          </PreviewImg>
                                      </figure>
                                  );
                              })
                            : null}
                        {previewList.length < 6 && (
                            <FakeFileInput htmlFor="img" previewImgCount={previewList.length}>
                                <IconBase
                                    src="/img/icon/gallery.svg"
                                    alt="스쿨빌런 이미지등록 이미지"
                                />
                            </FakeFileInput>
                        )}
                    </Preview>
                </div>
                <div
                    css={css`
                        padding: 1em 0;
                    `}
                >
                    <div
                        css={css`
                            margin-bottom: 1em;
                        `}
                    >
                        <Input
                            type="text"
                            value={tag}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeTag(e)}
                            placeholder="#해시태그를 입력해주세요."
                            onKeyPress={(e: React.KeyboardEvent) => onEnter(e)}
                        />
                    </div>
                    <div>
                        {tagList &&
                            tagList.map((item: any, index: number) => {
                                return (
                                    <Tag key={index}>
                                        <span
                                            css={css`
                                                margin-right: 0.5em;
                                            `}
                                        >
                                            # {item.tag || item}
                                        </span>
                                        <span onClick={() => deleteTag(index)}>X</span>
                                    </Tag>
                                );
                            })}
                    </div>
                </div>
                <Button enabled={title.length > 0 && contents.length > 0} onClick={upload}>
                    {loading ? (
                        <img
                            css={css`
                                height: 2em;
                                width: 2em;
                            `}
                            src="/img/icon/white_spinner.gif"
                            alt="스쿨빌런 로딩스피너 이미지"
                        />
                    ) : (
                        '등록'
                    )}
                </Button>
            </WriteContainer>
        </WriteSection>
    );
};

export default PageWrite;
