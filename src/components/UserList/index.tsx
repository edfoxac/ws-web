import React from 'react';

import { Container, Role, User, Avatar } from './styles';

interface UserProps {
  nickname: string;
  isBot?: boolean;
}

const UserRow: React.FC<UserProps> = ({ nickname, isBot }) => {
  return (
    <User>
      <Avatar className={isBot ? 'bot' : ''} />
      <strong>{nickname}</strong>
      {isBot && <span>Bot</span>}
    </User>
  );
};

const UserList: React.FC = () => {
  return (
    <Container>
      <Role>Relacionados</Role>
      <UserRow nickname="Luciano" />
      <UserRow nickname="Gabriel" />
      <UserRow nickname="Luciano" />
      <UserRow nickname="Gabriel" />
      <UserRow nickname="Luciano" />
      <UserRow nickname="Gabriel" />
    </Container>
  );
};

export default UserList;
