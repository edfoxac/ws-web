import styled, { css } from 'styled-components';
import Editor from 'react-simple-code-editor';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
   background: #232129;
   border-radius: 10px;


   color: #666360;
   border: 2px solid #232129;


   /* display: flex; */
   align-items: center;

   & + div {
      margin-top: 8px;
   }

   ${(props) =>
     props.isErrored &&
     css`
       border-color: #c53030;
     `}
   ${(props) =>
     props.isFocused &&
     css`
       color: #f7ede8;
       border-color: #faaf40;
     `}
   ${(props) =>
     props.isFilled &&
     css`
       color: #f7ede8;
     `}


   input {
      flex: 1;
      background: transparent;
      border: 0;
      color: #f7ede8;
      font-family: 'Roboto Slab', serif;
      &::placeholder {
         color: #666360;
      }

   }

svg {
      margin-right: 16px;
   }

`;

export const Error = styled(Tooltip)`
  height: 20px;
  /* margin-left: 16px; */
  margin-right: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

export const TooltipText = styled(Tooltip)`
  height: 20px;
  /* margin-left: 16px; */
  margin-right: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #74777a;
    text-align: center;
    color: #f7ede8;
    border: #ff9000 solid 1px;
    &::before {
      border-color: #ff9000 transparent;
    }
  }
`;

export const InputText = styled(Editor)`
  flex: 1;
  background: transparent;
  border: 10;
  color: #f7ede8;
  font-family: 'Roboto Slab', serif;
  &::placeholder {
    color: #666360;
  }
`;
