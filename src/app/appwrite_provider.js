'use client';

import { createContext, useContext } from 'react';
import { Client } from 'appwrite';


const AppWriteContext = createContext();

export function useAppWriteContext(){
   return useContext(AppWriteContext);
}

export default function AppWriteProvider({ children }) {
  const client = new Client();

  client
    .setEndpoint('http://192.168.50.77:60/v1')
    .setProject('6643f12100122b48edf9');

  return (
    <AppWriteContext.Provider value={client}>
      {children}
    </AppWriteContext.Provider>
  );
}
