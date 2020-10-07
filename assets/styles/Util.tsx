import styled from "@emotion/styled";
import {MarkdownBase, MarkdownSm} from "./Markdown.style";
import {Color} from "./Color.style";
import {css} from "@emotion/core";
import {ColorChange} from "./Animate.style";

export const Tag = styled.div`
  display:inline-block;
  ${MarkdownSm(Color.yellow200)};
  background-color:${Color.yellow100};
  padding:0.2em 0.5em;
  border-radius: 5px;
  margin-right:0.5em;
  margin-bottom:0.5em;
`

interface ErrorMsgProps {
  visible: boolean;
}
export const ErrorMsg=styled.div<ErrorMsgProps>`
    ${MarkdownSm(Color.red)};
    visibility: ${(props:ErrorMsgProps)=>(props.visible ? 'visible':'hidden')};
`

export const SkeletonColor=()=>css`
  animation: ${ColorChange} 1s linear infinite alternate both;
`
