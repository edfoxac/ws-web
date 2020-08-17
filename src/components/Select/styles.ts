import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
   background: #232129;
   border-radius: 10px;
   padding-left: 16px;
   padding-right: px;
   padding-bottom: 4px;
   padding-top: 4px;
   /* max-width: 320px; */
   width: 100%;

   color: #666360;
   border: 2px solid #232129;


   display: flex;
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
       color: #faaf40;
       border-color: #faaf40;
     `}
   ${(props) =>
     props.isFilled &&
     css`
       color: #faaf40;
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
      margin-right: 8px;
   }

`;

export const SelectArea = styled.div`
  flex: 1;
  background: transparent;
  border: 0;
  color: #f7ede8;
  font-family: 'Roboto Slab', serif;
  &::placeholder {
    color: #666360;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  right: 8px;
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
  margin-right: 4px;
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
