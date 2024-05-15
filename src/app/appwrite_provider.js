'use client';

import { createContext, useContext } from 'react';
import AppWriteHelper from './appwrite_helper';

const AppWriteContext = createContext();

export function useAppWriteContext(){
   return useContext(AppWriteContext);
}

export default function AppWriteProvider({ children }) {
  return (
    <AppWriteContext.Provider value={new AppWriteHelper()}>
      {children}
    </AppWriteContext.Provider>
  );
}
