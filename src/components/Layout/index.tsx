import React from 'react';

import { Grid } from './styles';
import TopBar from '../TopBar';
import MenuLeft from '../MenuLeft';
import UserInfo from '../UserInfo';
import Conteudo from '../Conteudo';

const Layout: React.FC = () => {
  return (
    <Grid>
      <TopBar />
      <MenuLeft />
      <UserInfo />

      <Conteudo />
      {/*
         <ChannelInfo />
         <ChannelList />
         <UserList />
         */}
    </Grid>
  );
};

export default Layout;
