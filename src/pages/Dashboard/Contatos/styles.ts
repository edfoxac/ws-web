import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface IContatosProps {
  available: boolean;
}

export const Container = styled.div`
  grid-area: CD;
  margin: 20px;
`;

export const Header = styled.header`
  padding: 31px 0;
  background: #28262e;
  padding-left: 20px;
  padding-right: 20px;
`;

export const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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

export const HeaderContent = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
  }
  svg {
    color: #999591;
    width: 20px;
    height: 20px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }
    strong {
      color: #faaf40;
    }
    a {
      text-decoration: none;

      color: #faaf40;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 100%;
  /* margin: 0px auto; */
  display: flex;
  padding-left: 0px;
  padding-right: 0px;
`;

export const Schedule = styled.div`
  flex: 1;
  /* margin-right: 60px; */
  > h1 {
    font-size: 30px;
  }
  p {
    margin-left: 0px;
    color: #faaf40;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }
    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      margin: 0 8px;
      border-left: 1px solid #faaf40;
    }
  }
  > div {
    /* margin-top: 34px; */
    > strong {
      color: #999591;
      font-size: 20px;
      font-weight: 400;
    }
  }
`;

export const NextAppointment = styled.div<IContatosProps>`
  transition: transform 0.3s linear;
  &:hover {
    transform: translateX(-6px);
  }

  margin-top: 10px;
  margin-bottom: 10px;
  ${(props) =>
    !props.available &&
    css`
      opacity: 0.3;
    `};

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

      svg {
        color: #faaf40;
        margin-right: 8px;
      }
    }
  }
`;

export const SubTitulo = styled.div``;

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

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
  > p {
    color: #999591;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 60px;

    svg {
      color: #faaf40;
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      color: #fff;
      margin-left: 24px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;
  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #faaf40 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
