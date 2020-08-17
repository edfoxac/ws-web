import React, { useRef, useEffect } from 'react';

import { Container } from './styles';

const Conteudo: React.FC = () => {
   const messagesRef = useRef() as React.MutableRefObject<HTMLDivElement>;

   useEffect(() => {
      const div = messagesRef.current;

      if (div) {
         div.scrollTop = div.scrollHeight;
      }
   }, [messagesRef]);

   return (
      <Container>
         <h1>Conteúdo</h1>
      </Container>
   );
};

export default Conteudo;
