import {css} from "@emotion/core";
import {media} from "./Media.style";
import styled from "@emotion/styled";

export const FlexBox = (flexDirection:string='row', justifyContent: string = 'center', alignItems: string = 'center') => css`
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
`;

export const Section=()=>css` 
  width:1000px;
  margin:6em auto 0 auto;
  min-height:100vh;
  ${media.md`width:80%;`};
  ${media.sm`width:90%;`};
`

export const onlyPc=()=>css`
  display:inherit;
  ${media.sm`display:none;`}
`

export const onlyMobile=()=>css`
  display:none;
  ${media.sm`display:inherit;`}
`

export const Position=(position:string)=>css`
  position:${position};
`;

export const Margin=(top:number=0, right:number=0, bottom:number=0, left:number=0)=>css`
  margin:${top}em ${right}em ${bottom}em ${left}em;
`;

export const Padding=(top:number=0, right:number=0, bottom:number=0, left:number=0)=>css`
  padding:${top}em ${right}em ${bottom}em ${left}em;
`;


export const HalfGrid=styled.div`
  display:grid; 
  grid-template-columns: 1fr 1fr; 
  grid-gap:1em;
`;

export const Grid=(left:number=50, right:number=50)=>css`
  display:grid; 
  grid-template-columns: ${left}% ${right}%;
`;