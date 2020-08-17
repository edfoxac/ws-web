import styled from 'styled-components';
import { Menu } from 'styled-icons/feather';

import { Props } from '.';

export const Container = styled.div`
  grid-area: SL;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: var(--tertiary);
  padding: 11px 0;

  /* max-height: 100vh; */
  height: 100%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  > span {
    font-size: 12px;
    margin-bottom: 8px;
    cursor: pointer;
  }
`;

export const Separator = styled.div`
  width: 32px;
  border-bottom: 2px solid var(--quaternary);
  margin-bottom: 8px;
`;

export const ExpandIcon = styled(Menu)`
  width: 18px;
  height: 18px;
  color: var(--white);
  cursor: pointer;
  margin-top: 0px;
`;

export const Button = styled.button<Props>`
  display: flex;
  align-items: center;
  justify-content: left;
  flex-shrink: 0;
  padding-left: 15px;
  width: 90%;
  height: 40px;
  border-radius: 6px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isHome ? 'var(--rocketseat)' : 'var(--primary)'};
  color: var(--gray);
  position: relative;
  cursor: pointer;

   > span {
      margin-left: 5px;
      margin-top: 2px;
   }

  > img {

    width: ${(props) => (props.isHome ? '85px' : '48px')};
    height: ${(props) => (props.isHome ? '85px' : '48px')};
    border-radius: 50%;
  }

  &::before {
    width: 9px;
    height: 9px;

    position: absolute;
    left: -17px;
    top: calc(50% - 4.5px);

    background-color: var(--white);
    border-radius: 10%;

    content: '';
    display: ${(props) => (props.hasNotifications ? 'inline' : 'none')};
  }

  &::after {
    background-color: var(--notification);
    width: auto;
    height: 16px;

    padding: 0 4px;

    position: absolute;
    bottom: -4px;
    right: -4px;

    border-radius: 12px;
    border: 4px solid var(--quaternary);

    text-align: right;
    font-size: 13px;
    font-weight: bold;
    color: var(--white);

    content: '${(props) => props.mentions && props.mentions}';
    display: ${(props) =>
      props.mentions && props.mentions > 0 ? 'inline' : 'none'}
  }

  transition: border-radius 0.4s, background-color 0.2s;

  &.active,
  &:hover {
    border-radius: 10px;
    color: var(--white);
    background-color: ${(props) =>
      props.isHome ? 'var(--rocketseat)' : 'var(--rocketseat)'};
  }
`;
