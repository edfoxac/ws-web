import React, { createContext, useCallback, useState, useContext } from 'react';

interface MenuContextData {
  url: string;
  urlPerfil: string;
  updateUrl(url: string): void;
  updateUrlPerfil(url: string): void;
}

interface MenuState {
  url: string;
}
interface MenuStatePerfil {
  urlPerfil: string;
}

const MenuContext = createContext<MenuContextData>({} as MenuContextData);

// eslint-disable-next-line react/prop-types
const MenuProvider: React.FC = ({ children }) => {
  const [data, setdata] = useState<MenuState>(() => {
    const url = localStorage.getItem('@Gobarber:url');
    return { url } as MenuState;
  });

  const [dataPerfil, setDataPerfil] = useState<MenuStatePerfil>(() => {
    const urlPerfil = localStorage.getItem('@Gobarber:urlPerfil');
    return { urlPerfil } as MenuStatePerfil;
  });

  const updateUrl = useCallback((url: string) => {
    localStorage.setItem('@Gobarber:url', url);
    setdata({ url });
  }, []);

  const updateUrlPerfil = useCallback((urlPerfil: string) => {
    localStorage.setItem('@Gobarber:urlPerfil', urlPerfil);
    setDataPerfil({ urlPerfil });
  }, []);

  return (
    <MenuContext.Provider
      value={{
        url: data.url,
        updateUrl,
        urlPerfil: dataPerfil.urlPerfil,
        updateUrlPerfil,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

function useMenu(): MenuContextData {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('useMenu must be used whitin an MenuPorvider');
  }

  return context;
}

export { MenuProvider, useMenu };
