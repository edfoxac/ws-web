import React, { useRef, useEffect } from 'react';

import { Container } from './styles';
// import UserList from '../../../components/UserList';

const Arquivos: React.FC = () => {
  const messagesRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  // const params = useRouteMatch();

  useEffect(() => {
    const div = messagesRef.current;
    // console.log(params.path);
    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  }, [messagesRef]);

  return (
    <>
      <Container>
        <h1>Arquivos</h1>
      </Container>
    </>
  );
};

export default Arquivos;
