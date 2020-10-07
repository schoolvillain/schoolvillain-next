import {css, jsx} from '@emotion/core';

interface sizeType{
   [key:string]: number;
}

const size:sizeType = {
    lg: 1920,
    md: 1024,
    sm: 480
};

export const media = Object.keys(size).reduce((acc:any, label:string) => {
    acc[label] = (...args:any) => css`
    @media (max-width: ${size[label]}px) {
      ${css(...args)};
    }
  `;
    return acc;
}, {});