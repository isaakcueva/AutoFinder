import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  userDetails: { username: string; email: string } | null;
  setUserDetails: (details: { username: string; email: string } | null) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState<{
    username: string;
    email: string;
  } | null>(null);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
};
