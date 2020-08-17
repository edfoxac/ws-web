import styled from 'styled-components';

// SL - Server List
// SN - Server Name
// CI - Channel Info
// CL - Channel List
// CD - Channel Data
// UI - User Info

export const Grid = styled.div`
   display: grid;

   grid-template-columns: 200px auto;
   grid-template-rows: 46px auto 52px;

   grid-template-areas:
      'SN SN SN '
      'SL CD CD '
      'UI CD CD ';
   height: 100vh;
`;
