import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from './styles';

import TopBar from '../../components/TopBar';
import MenuLeft from '../../components/MenuLeft';
import UserInfo from '../../components/UserInfo';

import Home from './Home';
import Briefings from './Briefings';
import Pits from './Pits';
import Pauta from './Pauta';
import Arquivos from './Arquivos';
import Pms from './Pms';
import Ecs from './Ecs';
import Autorizacoes from './Autorizacoes';
import Notificacoes from './Notificacoes';
import Financeiro from './Financeiro';
import Configuracoes from './Configuracoes';
import Contatos from './Contatos';
import Produtos from './Produtos';
import Profile from '../Profile';
import GlobalStyles from '../../styles/GlobalStyles';

const AdminDashboard: React.FC = () => {
  return (
    <>
      <Grid>
        <TopBar />
        <MenuLeft />
        <UserInfo />
        <Switch>
          <Route path="/dashboard" exact component={Home} />
          <Route path="/dashboard/briefings" component={Briefings} />
          <Route path="/dashboard/pits" component={Pits} />
          <Route path="/dashboard/pauta" component={Pauta} />
          <Route path="/dashboard/arquivos" component={Arquivos} />
          <Route path="/dashboard/pms" component={Pms} />
          <Route path="/dashboard/ecs" component={Ecs} />
          <Route path="/dashboard/autorizacoes" component={Autorizacoes} />
          <Route path="/dashboard/notificacoes" component={Notificacoes} />
          <Route path="/dashboard/financeiro" component={Financeiro} />
          <Route path="/dashboard/contatos" component={Contatos} />
          <Route path="/dashboard/contatos2" component={Produtos} />
          <Route path="/dashboard/perfil" component={Profile} />
          <Route path="/dashboard/configuracoes" component={Configuracoes} />
        </Switch>
      </Grid>
      <GlobalStyles />
    </>
  );
};

export default AdminDashboard;
