import React, { useContext, ReactNode, useState, useEffect } from "react";
import axios from "axios";
import userService from "../services/userService";
import { User } from "../types/custom";
import {
  localStorageService,
  setTokens
} from "../services/localStorageService";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: import.meta.env.VITE_REACT_APP_FIREBASE_KEY
  }
});

interface AuthProps {
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthContextType {
  user: User | undefined | null;
  error: string | null;
  login: (props: Omit<AuthProps, "confirmPassword">) => void;
  signup: (props: AuthProps) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined | null>();
  const [error, setError] = useState<string | null>(null);

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setUser(content);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }
  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    }
  }, []);

  function logout() {
    localStorageService.removeAuthData();
    setUser(null);
  }

  const login = async ({
    email,
    password
  }: Omit<AuthProps, "confirmPassword">) => {
    try {
      const { data } = await httpAuth.post("accounts:signInWithPassword", {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      getUserData();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data.error) {
          const { code, message } = e.response.data.error;
          if (code === 400) {
            if (
              message === "INVALID_LOGIN_CREDENTIALS" ||
              message === "INVALID_EMAIL"
            ) {
              throw new Error("Email or password are incorrect");
            }
          }
        }
        throw new Error("Something went wrong. Try again later");
      }
    }
  };

  async function signup({
    email,
    password,
    confirmPassword,
    ...rest
  }: AuthProps) {
    try {
      if (password !== confirmPassword) {
        const errorObject = {
          password: "Passwords do not match",
          confirmPassword: "Passwords do not match"
        };
        throw errorObject;
      }
      const { data } = await httpAuth.post("accounts:signUp", {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data.error) {
          const { code, message } = e.response.data.error;
          if (code === 400) {
            if (message === "EMAIL_EXISTS") {
              const errorObject = { email: "Email already in use" };
              throw errorObject;
            }
          }
        }
        throw new Error("Something went wrong. Try again later");
      }
    }
  }

  async function createUser(data: User) {
    try {
      const { content } = await userService.create(data);

      if (content) {
        setUser(content);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
