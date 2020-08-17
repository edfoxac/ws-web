import styled, { css } from 'styled-components';

interface IFoodPlateProps {
  available: boolean;
}

export const Container = styled.div<IFoodPlateProps>`
  background: #222;
  border-radius: 8px;
  transition: transform 0.5s linear;

  /* cursor: pointer; */

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 885px) {
    margin-bottom: 20px;
  }

  header {
    background: #ffb84d;
    border-radius: 8px 8px 8px 8px;
    height: 192px;
    overflow: hidden;
    transition: 0.3s opacity;
    text-align: center;
    justify-content: center;
    display: flex;
    align-items: center;

    ${(props) =>
      !props.available &&
      css`
        opacity: 0.3;
      `};

    img {
      pointer-events: none;
      user-select: none;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }

  section.body {
    padding: 15px;

    h2 {
      margin-top: 10px;
      color: #ddd;
      font-size: 16px;
    }
    img {
      pointer-events: none;
      user-select: none;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    p {
      color: #aaa;
      margin-top: 5px;
      font-size: 14px;
    }
    .headerDiv {
      display: flex;
      justify-content: space-between;
    }
    .price {
      font-style: normal;
      font-size: 24px;
      line-height: 34px;
      color: #39b100;

      b {
        font-weight: 600;
      }
    }
    div.icon-container {
      button {
        background: #444;
        padding: 7px;
        border-radius: 8px;
        display: flex;
        border: none;
        transition: 0.1s;

        svg {
          color: #eee;
        }

        & + button {
          margin-left: 6px;
        }
      }
    }
    .icons {
      display: flex;
    }
  }

  section.footer {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 10px 0px;
    @media (max-width: 1047px) {
      padding: 20px 20px;
      margin-bottom: auto;
    }
    background: #303030;
    border-radius: 0px 0px 8px 8px;

    div.availability-container {
      display: flex;
      align-items: center;

      p {
        color: #ccc;

        @media (max-width: 1178px) {
          display: none;
        }
      }

      .switch {
        position: relative;
        display: inline-block;
        width: 88px;
        height: 32px;
        margin-left: 12px;

        & input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #c72828;
          -webkit-transition: 0.4s;
          transition: 0.4s;
          border-radius: 16px;

          &:before {
            position: absolute;
            content: '';
            height: 20px;
            width: 40px;
            left: 8px;
            bottom: 6px;
            background-color: white;
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: 10px;
          }
        }

        input:checked + .slider {
          background-color: #39b100;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196f3;
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(32px);
          -ms-transform: translateX(32px);
          transform: translateX(32px);
        }
      }
    }
  }
`;
