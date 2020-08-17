import React from 'react';

import { AuthProvider } from './auth';
import { MenuProvider } from './menu';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <MenuProvider>
      <ToastProvider>{children}</ToastProvider>
    </MenuProvider>
  </AuthProvider>
);

export default AppProvider;
