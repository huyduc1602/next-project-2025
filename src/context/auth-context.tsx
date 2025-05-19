'use client';

// React context for authentication
import React, { createContext, useContext } from 'react';

const AuthContext = createContext({});
export function useAuthContext() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
