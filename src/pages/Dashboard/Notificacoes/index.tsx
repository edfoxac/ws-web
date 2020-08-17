import React, { useRef, useEffect } from 'react';

// import { useRouteMatch } from 'react-router-dom';

import { Container } from './styles';

const Notificacoes: React.FC = () => {
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
      <Container>
         <h1>Notificacoes</h1>
      </Container>
   );
};

export default Notificacoes;
