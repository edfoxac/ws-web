import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
  }

  /* button {
    margin-top: 48px;
    align-self: flex-end;
  } */

  /* button {
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #39b100;
    color: #fff;

    display: flex;
    flex-direction: row;
    align-items: center;

    .text {
      padding: 16px 24px;
      @media (max-width: 358px) {
        display: none;
      }
    } */

  .icon {
    display: flex;
    padding: 16px 16px;
    background: #41c900;
    border-radius: 0 8px 8px 0;
    margin: 0 auto;
  }
`;

export const LoadContatos = styled.div`
  margin-top: 10px;

  > strong {
    color: #999591;
    font-size: 16px;
    font-weight: 400;
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 16px;
    border-radius: 10px;
    margin-top: 10px;
    position: relative;

    &::before {
      position: absolute;
      height: 80%;
      width: 2px;
      left: 0;
      top: 10%;
      content: '';
      background: #faaf40;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      color: #fff;
      margin-left: 24px;
    }

    span {
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        color: #faaf40;
        margin-right: 8px;
      }
    }
  }
`;

export const TopoListarRelacionados = styled.div`
  position: absolute;
  width: 100%;
  top: 80%;
  padding-left: 50px;
  padding-right: 50px;
  /* overflow: scroll; */
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 500px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ListarRelacionados = styled.div`
  transition: transform 0.3s linear;
  &:hover {
    transform: translateX(-6px);
  }

  margin-top: 10px;
  margin-bottom: 10px;

  > strong {
    color: #999591;
    font-size: 16px;
    font-weight: 400;
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 16px;
    border-radius: 10px;
    margin-top: 10px;
    position: relative;

    &::before {
      position: absolute;
      height: 80%;
      width: 2px;
      left: 0;
      top: 10%;
      content: '';
      background: #faaf40;
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    strong {
      > span {
        font-size: 11px;
        margin-top: 5px;
      }
      color: var(--white);
      margin-left: 24px;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;
      cursor: pointer;
      svg {
        color: #faaf40;
        margin-right: 8px;
      }
    }
  }
`;
