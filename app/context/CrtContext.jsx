'use client';
import { createContext, useContext, useState } from 'react';

const CrtContext = createContext(undefined);

export const CrtContextProvider = ({ children }) => {
  const [crt, setCrt] = useState(false);

  return (
    <CrtContext.Provider value={{ crt, setCrt }}>
      <span className={crt ? 'scanlines' : '--hidden'} />
      <span className={crt ? 'scanner' : '--hidden'} />
      <div className={crt ? 'bright' : ''}>
        {children}
      </div>
    </CrtContext.Provider>
  );
};

export const useCrtContext = () => {
  const context = useContext(CrtContext);
  if (!context) {
    throw new Error('Component is outside of CrtContextProvider');
  }
  return context;
};
