import styled, { css } from 'styled-components';
import { shade } from 'polished';

import BGimg from '../../assets/userBG.jpg';

interface PropsButon {
  active?: string;
}

export const Header = styled.div`
  background: var(--primary);
  padding: 30px 30px 22px;
  width: 100%;
  background: url(${BGimg}) no-repeat center;
  background-size: cover;

  header {
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: left;
    @media (max-width: 579px) {
      img {
        width: 75%;
      }
    }

    @media (max-width: 375px) {
      img {
        width: 80%;
      }
    }
  }
`;

export const Container = styled.div`
  grid-area: CO;
`;

export const Headers = styled.div`
  grid-area: HE;
`;

export const SubMenuBotao = styled.div<PropsButon>`
  .iconCenter {
    display: flex;
    padding: 15px 24px;
    color: var(--primary);
    border-radius: 0px 0px 0px 0px;
    @media (max-width: 779px) {
      border-radius: 0px;
    }
    @media (max-width: 375px) {
      padding: 8px 10px;
    }
    @media (max-width: 320px) {
      padding: 6px 8px;
    }
    transition: background-color 0.3s;
    &:hover {
      color: var(--white);
      background-color: #faaf40;
    }
    ${(props) =>
      props.active
        ? css`
            background-color: #faaf40;
            color: var(--white);
          `
        : ''}
  }
`;

export const SubMenu = styled.div`
  height: 54px;
  background: var(--white);
  border-bottom: var(--tertiary) solid 2px;
  color: var(--primary);
  border-bottom: #faaf40 solid 6px;
  nav {
    div {
      display: felx;
      justify-content: left;

      /* button + button::before {
        content: '';
        width: 1px;
        height: 0px;
        margin: 0 1px;
      } */

      button {
        font-weight: 400;
        border-radius: 0px;
        border: 0;
        color: #fff;

        display: flex;
        flex-direction: row;
        align-items: center;

        .text {
          padding: 16px 24px;
          @media (max-width: 779px) {
            display: none;
          }
        }
      }
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 200px 200px;
  grid-template-rows: 199px auto;
  grid-template-areas:
    'HE HE HE'
    'CO CO CO';
  /* height: 100vh; */
`;

export const Content = styled.div`
  /* grid-area: CO; */
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  margin: 0px auto 0;
  width: 100%;

  form {
    margin: 50px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  h1 {
    margin-bottom: 24px;
    font-size: 20px;
    text-align: left;
  }

  a {
    color: #f7ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: ${shade(0.2, '#f7ede8')};
    }
  }

  /*
   input[name='old_password'] {
      margin-top: 24px;
   }
   */
`;

export const AvatarInput = styled.div`
  position: relative;
  width: 86px;
  align-self: center;

  img {
    width: 86px;
    height: 86px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 24px;
    height: 24px;
    background: #ff9000;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    transition: background-color 0.3s;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }
    svg {
      width: 10px;
      height: 10px;
      color: #312e38;
    }
    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const AvatarInputTopo = styled.div`
  width: 86px;
  align-self: center;
  img {
    width: 86px;
    height: 86px;
    border-radius: 50%;
  }
`;

export const DadosPerfilTopo = styled.div`
  align-self: center;
  margin-left: 20px;
`;
