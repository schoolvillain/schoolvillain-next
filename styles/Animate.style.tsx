import { keyframes } from '@emotion/core';
import { Color } from './Color.style';

export const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const FadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const Cursor = keyframes`
    0%{border-left: 1px solid transparent;}
    50%{border-left: 1px solid ${Color.gray200};}
    100%{border-left: 1px solid transparent;}
`;

export const TypingPc = keyframes`
    0% { width: 0; }
    50% { width: 185px; }
    100% { width: 185px; }
`;

export const TypingMobile = keyframes`
    0% { width: 0; }
    50% { width: 150px; }
    100% { width: 150px; }
`;

export const ColorChange = keyframes`
    0% {
        background: #eeeeee;
    }
    100% {
        background: #fafafa;
    }
`;

export const Blink = keyframes`
    0% { 
        transform: translateX(0);
        transition: transform;  
    }
    50%{
        transform: translateX(5px);
        transition: transform; 
    }
    100% { 
        transform: translateX(0);
        transition: transform; 
    }
`;
