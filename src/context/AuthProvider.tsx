import React, { useContext, ReactNode, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
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
}

interface AuthContextType {
  user: User;
  login: (props: AuthProps) => void;
  signup: (props: AuthProps) => void;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setUser(content);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }
  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    }
  }, []);

  const login = async ({
    email,
    password
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await httpAuth.post("accounts:signInWithPassword", {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      getUserData();
    } catch (e) {
      const axiosError = e as AxiosError;
      const { code, message } = axiosError.response.data.error;

      if (code === 400) {
        if (
          message === "INVALID_LOGIN_CREDENTIALS" ||
          message === "INVALID_EMAIL"
        ) {
          throw new Error("Email or password are incorrect");
        }
      }
    }
  };

  async function signup({
    email,
    password,
    confirmPassword,
    ...rest
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    try {
      if (password !== confirmPassword) {
        console.log(password);
        console.log(confirmPassword);

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
    } catch (e) {
      const axiosError = e as AxiosError;
      const { code, message } = axiosError.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = { email: "Email already in use" };
          throw errorObject;
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      console.log(content);

      if (content) {
        setUser(content);
      }
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
