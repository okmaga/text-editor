import React, { useContext, ReactNode, useState } from "react";
import axios from "axios";
import userService from "../services/userService";

const httpAuth = axios.create({});

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

const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  function setTokens({
    refreshToken,
    idToken,
    expiresIn = 3600
  }: {
    refreshToken: string;
    idToken: string;
    expiresIn: number;
  }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate.toString());
  }
  const login = ({ email, password }: { email: string; password: string }) => {
    console.log(email, password);
  };

  async function signup({
    email,
    password,
    ...rest
  }: {
    email: string;
    password: string;
  }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      console.log(data);
      setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
    } catch (e) {
      console.log(e);
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setUser(content);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  }

  return (
    <AuthContext.Provider value={{ user, error, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
