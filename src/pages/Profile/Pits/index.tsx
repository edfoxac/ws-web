import React, { useRef, useEffect } from 'react';

import { Container } from './styles';
// import UserList from '../../../components/UserList';

const Pits: React.FC = () => {
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
        <h1>Pits</h1>
      </Container>
    </>
  );
};

export default Pits;
