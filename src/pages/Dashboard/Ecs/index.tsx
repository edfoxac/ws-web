import React, { useRef, useEffect } from 'react';

// import { useRouteMatch } from 'react-router-dom';

import { Container } from './styles';

const Ecs: React.FC = () => {
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
         <h1>Ecs</h1>
      </Container>
   );
};

export default Ecs;
