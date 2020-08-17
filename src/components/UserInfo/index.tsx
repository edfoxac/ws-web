import React, { useCallback } from 'react';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  LogOffIcon,
  Profile,
  UserData,
  // MicIcon,
  // HeadphoneIcon,
  // SettingsIcon,
} from './styles';
import { useMenu } from '../../hooks/menu';

const UserInfo: React.FC = () => {
  const { signOut, user } = useAuth();
  const { updateUrl, updateUrlPerfil } = useMenu();
  const signOutMenu = useCallback(() => {
    updateUrl('');
    updateUrlPerfil('');
    signOut();
  }, [updateUrl, signOut, updateUrlPerfil]);
  return (
    <Container>
      <Profile>
        {/* <Avatar /> */}
        <img src={user.avatar_url} alt={user.avatar_url} />
        <UserData>
          <strong>{user.apelido_fantasia}</strong>
          {/* <span>{user.nome_razao}</span> */}
        </UserData>
      </Profile>
      {/* <MicIcon />
      <HeadphoneIcon />
      <SettingsIcon />
      <MessageIcon />
      <MenuIcon />
      */}

      <LogOffIcon onClick={signOutMenu} />
    </Container>
  );
};

export default UserInfo;
