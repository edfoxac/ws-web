import styled from 'styled-components';
import { shade } from 'polished';
import { AlternateEmail } from 'styled-icons/material';

export const Container = styled.div`
  grid-area: CO;
  margin: 20px;
  border-radius: 10px;
  background-color: var(--primary);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  place-content: center;
  margin: 0px auto 0;
  width: 100%;

  form {
    /* margin: 10px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column; */
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

export const Messages = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;

  max-height: calc(100vh - 46px - 68px);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--tertiary);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--secondary);
  }
`;

export const InputWrapper = styled.div`
  width: 100%;

  padding: 0 16px;
`;

export const Input = styled.input`
  width: 100%;
  height: 44px;

  padding: 0 10px 0 57px;
  border-radius: 7px;

  color: var(--white);
  background-color: var(--chat-input);

  position: relative;

  &::placeholder {
    color: var(--gray);
  }

  ~ svg {
    position: relative;
    top: -50%;
    left: 14px;
    transition: 180ms ease-in-out;
  }
`;

export const InputIcon = styled(AlternateEmail)`
  width: 24px;
  height: 24px;
  color: var(--gray);
`;

export const RelacionadosContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  /* max-width: 1280px; */
  padding: 20px 20px 20px 20px;
  margin-top: 0px;

  display: grid;

  grid-template-columns: repeat(3, minmax(250px, 1fr));
  grid-gap: 32px;

  object-fit: cover;

  @media (max-width: 885px) {
    display: flex;
    flex-direction: column;
  }
`;

export const NavBar = styled.div`
  margin: 0 auto;
  width: 100%;
  /* max-width: 1280px; */
  padding: 20px 20px 20px 20px;
  display: flex;
  justify-content: space-between;

  span {
    color: #999591;
    margin-left: auto;
    margin-right: auto;

    svg {
      color: #faaf40;
      margin-left: 8px;
      margin-right: 8px;
    }
  }
  nav {
    div {
      button {
        font-weight: 400;
        border-radius: 8px;
        border: 0;
        background: #faaf40;
        color: #fff;

        display: flex;
        flex-direction: row;
        align-items: center;

        .text {
          padding: 8px 12px;
          font-size: 12px;
          @media (max-width: 779px) {
            display: none;
          }
        }

        .icon {
          display: flex;
          padding: 12px 12px;
          background: #facf20;
          border-radius: 0 8px 8px 0;
          @media (max-width: 779px) {
            border-radius: 8px;
          }
          @media (max-width: 375px) {
            padding: 8px 10px;
          }
          @media (max-width: 320px) {
            padding: 6px 8px;
          }
        }
        .iconLeft {
          display: flex;
          padding: 12px 12px;
          background: #facf20;
          border-radius: 8px 0px 0px 8px;
          @media (max-width: 779px) {
            border-radius: 8px 0px 0px 8px;
          }
          @media (max-width: 375px) {
            padding: 8px 10px;
          }
          @media (max-width: 320px) {
            padding: 6px 8px;
          }
        }
        .iconLeftInativo {
          cursor: not-allowed;
          display: flex;
          opacity: 0.2;
          padding: 12px 12px;
          background: #facf20;
          border-radius: 8px 0px 0px 8px;
          @media (max-width: 779px) {
            border-radius: 8px 0px 0px 8px;
          }
          @media (max-width: 375px) {
            padding: 8px 10px;
          }
          @media (max-width: 320px) {
            padding: 6px 8px;
          }
        }
        .iconCenter {
          display: flex;
          padding: 12px 12px;
          background: #facf20;
          border-radius: 8px;
          @media (max-width: 779px) {
            border-radius: 8px;
          }
          @media (max-width: 375px) {
            padding: 8px 10px;
          }
          @media (max-width: 320px) {
            padding: 6px 8px;
          }
        }
        .iconCenterInativo {
          cursor: not-allowed;
          display: flex;
          opacity: 0.2;
          padding: 12px 12px;
          background: #facf20;
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
        }
        .iconRight {
          display: flex;
          padding: 12px 12px;
          background: #facf20;
          border-radius: 0 8px 8px 0;
          @media (max-width: 779px) {
            border-radius: 0 8px 8px 0;
          }
          @media (max-width: 375px) {
            padding: 8px 10px;
          }
          @media (max-width: 320px) {
            padding: 6px 8px;
          }
        }
      }
    }
  }
`;
