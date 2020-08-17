import styled from 'styled-components';
import { shade } from 'polished';

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

export const FormLayout = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

export const FormGrpup = styled.div`
  flex: 1;
  & + div {
    margin-left: 10px;
  }
`;

export const FormSpace = styled.div`
  flex: 1;
  border-top: solid 1px var(--gray);
  margin: 10px 20px;
  border-radius: 10px;
`;

export const FormTitle = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  font-size: 18px;
`;

export const FormLayoutButton = styled.div`
  display: flex;
  margin: 0px 20px 20px;
  justify-content: center;
`;

export const FormGrpupButton = styled.div``;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  width: 186px;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
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
      width: 20px;
      height: 20px;
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
