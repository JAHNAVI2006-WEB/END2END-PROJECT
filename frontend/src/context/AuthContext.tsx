import React from 'react'; export const AuthProvider = ({children}: {children: React.ReactNode}) => <>{children}</>; export const useAuth = () => ({ user: { name: 'admin' } });
