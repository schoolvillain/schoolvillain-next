import {Global, css} from '@emotion/core';
import {Color} from './Color.style';
import * as React from "react";
import {media} from './Media.style';

export const GlobalStyle = () => (
    <Global styles={css`
    *{
      margin:0;
      padding:0;
    }
    html {
      width: 100%;
      height: 100%;
    }
    
    // &::selection {
    //   background: ${Color.yellow100}; /* WebKit/Blink Browsers */
    // }
    // &::-moz-selection {
    //   background: ${Color.yellow100}; /* Gecko Browsers */
    // }

    body {
      width: 100%;
      font-family: 'NanumSquare', sans-serif;
      font-size: 16px;
      font-weight: 400;
      color: ${Color.black};
      ${media.sm`font-size: 13px;`};
    }
    
    select{
      font-family: 'NanumSquare', sans-serif;
      font-size: 16px;
      outline:none;
      ${media.sm`font-size: 13px;`};
      &::placeholder{
        color:${Color.gray150};
       }
    }
    
    textarea {
      font-family: 'NanumSquare', sans-serif;
      font-size: 16px;
      outline:none;
      ${media.sm`font-size: 13px;`};
      &::placeholder{
        color:${Color.gray150};
       }
    }
   
    input {
      font-family: 'NanumSquare', sans-serif;
      font-size: 16px;
      outline:none;
       ${media.sm`font-size: 13px;`};
       &::placeholder{
        color:${Color.gray150};
       }
    }
    input[type="password"]{
       font-family: Arial, sans-serif;
       letter-spacing: 2px;
       &::placeholder{
        letter-spacing: 0;
       }
    }
    button{
      border:0;
      background-color:transparent;
      cursor:pointer;
      outline:none;
    }
    li {
      margin:0;
      padding: 0;
      list-style: none;
    }
    
    ol, ul {
      margin: 0;
      padding: 0;
    }
    
    em{
        background-color: ${Color.yellow100};
        font-style: normal;
    }
    a {
      text-decoration: none;
      color: ${Color.black};
    }
    
    @font-face {
     font-family: 'NanumSquare';
     font-weight: 300;
     src: local('NanumSquare'),
          url(require('../font/NanumSquareL.eot')),
          url(require('../font/NanumSquareL.eot?#iefix')) format('embedded-opentype'),
          url(require('../font/NanumSquareL.woff')) format('woff'),
          url(require('../font/NanumSquareL.ttf')) format('truetype');
    }
    
    @font-face {
     font-family: 'NanumSquare';
     font-weight: 400;
     src: local('NanumSquare'),
          url(require('../font/NanumSquareR.eot')),
          url(require('../font/NanumSquareR.eot?#iefix')) format('embedded-opentype'),
          url(require('../font/NanumSquareR.woff')) format('woff'),
          url(require('../font/NanumSquareR.ttf')) format('truetype');
    }
`}></Global>
)