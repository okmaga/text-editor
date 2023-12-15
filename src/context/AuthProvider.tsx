import React, { useContext, ReactNode } from "react";

interface AuthProps {
  email: string;
  password: string;
}

interface AuthContextType {
  user: string;
  login: (props: AuthProps) => void;
  signup: (props: AuthProps) => void;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const user = "user";
  const login = ({ email, password }: { email: string; password: string }) => {
    console.log(email, password);
  };

  const signup = ({ email, password }: { email: string; password: string }) => {
    const key = "AIzaSyDtvJI-UHUT_pLS9cm5BfSxLWvKa6WU2pw";
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key";

    console.log(email, password);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
