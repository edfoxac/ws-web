import React, { useCallback } from 'react';

import { FaHome, FaUsers, FaUser } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';
import { useHistory, Link } from 'react-router-dom';
import ServerButton from '../ServerButton';
import { useAuth } from '../../hooks/auth';
import { Container, Separator, Button } from './styles';
import { useMenu } from '../../hooks/menu';

export interface Props {
  selected?: boolean;
  isHome?: boolean;
  hasNotifications?: boolean;
  mentions?: number;
  avatarUrl?: string;
  nameIcon?: string;
  functionAtivarButton?: Function;
  icon?: React.ComponentType<IconBaseProps>;
}

const MenuLeft: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { url, updateUrl, updateUrlPerfil } = useMenu();

  const ativarMenu = useCallback(
    (rotaAtualizar: string, idUser?: number) => {
      updateUrl(rotaAtualizar);
      if (idUser) {
        updateUrlPerfil(rotaAtualizar);
        history.push(`/dashboard/${rotaAtualizar}/?idUser=${idUser}`);
      } else {
        history.push(`/dashboard/${rotaAtualizar}`);
      }
    },
    [history, updateUrl, updateUrlPerfil],
  );

  return (
    <>
      <Container>
        <ServerButton mentions={9} isHome avatarUrl={user.avatar_url} />

        <Link
          style={{
            textDecoration: 'none',
            color: '#fff',
            fontSize: 12,
            marginBottom: 10,
          }}
          to={{
            pathname: `/dashboard/perfil/`,
            search: `idUser=${user.id}`,
          }}
          onClick={() => ativarMenu('perfil')}
        >
          {user.nome_razao}
        </Link>

        <Separator />

        <Button onClick={() => ativarMenu('')} className={!url ? 'active' : ''}>
          <FaHome size={18} /> <span>Home</span>
        </Button>

        <Button
          onClick={() => ativarMenu('contatos')}
          className={url === 'contatos' ? 'active' : ''}
        >
          <FaUsers size={18} /> <span>Contatos</span>
        </Button>

        <Button
          onClick={() => ativarMenu('perfil', Number(user.id))}
          className={url === 'perfil' ? 'active' : ''}
        >
          <FaUser size={18} /> <span>Perfil</span>
        </Button>

        <Separator />

        <Button
          onClick={() => ativarMenu('contatos2')}
          className={url === 'contatos2' ? 'active' : ''}
        >
          <FaUser size={18} /> <span>Contatos 2</span>
        </Button>

        {/*
        <Button
          onClick={() => ativarMenu('briefings')}
          className={url === 'briefings' ? 'active' : ''}
        >
          <FaEdit size={18} /> <span>Briefings</span>
        </Button>

        <Button
          onClick={() => ativarMenu('pits')}
          className={url === 'pits' ? 'active' : ''}
        >
          <FaListOl size={18} /> <span>PITs</span>
        </Button>

        <Button
          onClick={() => ativarMenu('pauta')}
          className={url === 'pauta' ? 'active' : ''}
        >
          <FaList size={18} /> <span>Pauta</span>
        </Button>

        <Button
          onClick={() => ativarMenu('arquivos')}
          className={url === 'arquivos' ? 'active' : ''}
        >
          <FaFile size={18} /> <span>Arquivos</span>
        </Button>

        <Separator />

        <Button
          onClick={() => ativarMenu('pms')}
          className={url === 'pms' ? 'active' : ''}
        >
          <FaCalendar size={18} /> <span>PMs</span>
        </Button>

        <Button
          onClick={() => ativarMenu('ecs')}
          className={url === 'ecs' ? 'active' : ''}
        >
          <FaTasks size={18} /> <span>ECs</span>
        </Button>

        <Button
          onClick={() => ativarMenu('autorizacoes')}
          className={url === 'autorizacoes' ? 'active' : ''}
        >
          <FaFileInvoice size={18} /> <span>Autorizações</span>
        </Button>


        <Button
          onClick={() => ativarMenu('notificacoes')}
          className={url === 'notificacoes' ? 'active' : ''}
        >
          <FaBell size={18} /> <span>Notificações</span>
        </Button>

        <Button
          onClick={() => ativarMenu('financeiro')}
          className={url === 'financeiro' ? 'active' : ''}
        >
          <FaMoneyBill size={18} /> <span>Financeiro</span>
        </Button>

        <Button
          onClick={() => ativarMenu('configuracoes')}
          className={url === 'configuracoes' ? 'active' : ''}
        >
          <FaCogs size={18} /> <span>Configurações</span>
        </Button>

        */}
      </Container>
    </>
  );
};

export default MenuLeft;
