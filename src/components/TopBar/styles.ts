import styled from 'styled-components';

import { FaBell, FaBars, FaSignOutAlt } from 'react-icons/fa';

export const Container = styled.div`
  grid-area: SN;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 20px;
  background-color: var(--secondary);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 0px 0px;
  z-index: 2;
`;

export const Title = styled.h1`
  font-size: 16px;
  font-weight: bold;
  color: var(--white);
`;

export const MenuItensDireita = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MenuIcon = styled(FaBars)`
  width: 22px;
  height: 22px;
  color: var(--white);
  margin-right: 20px;
  cursor: pointer;
`;

export const LogoutIcon = styled(FaSignOutAlt)`
  width: 22px;
  height: 22px;
  color: var(--white);
  cursor: pointer;
`;

export const MessagIcon = styled(FaBell)`
  width: 18px;
  height: 18px;
  color: var(--white);
  cursor: pointer;
  margin-right: 20px;
`;

export const Link = styled.link`
  width: 28px;
  height: 28px;
  color: var(--white);
  cursor: pointer;
`;

export const Logo = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-left: 25px;
  > img {
    width: 118px;
    height: 25px;
  }
`;
