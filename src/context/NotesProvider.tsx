import React, { useState, useContext, ReactNode, useEffect } from "react";
import notesService from "../services/notesService";
import { Note } from "../types/custom";

interface NotesContextType {
  notes: Note[] | undefined | null;
  loading: boolean;
  error: string | object | null;
}

interface AxiosError {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
}

const NotesContext = React.createContext<NotesContextType>(
  {} as NotesContextType
);

interface NotesProviderProps {
  children: ReactNode;
}

const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Note[] | undefined | null>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getNotesList();
  }, []);

  async function getNotesList() {
    try {
      const { content } = await notesService.get();
      setNotes(content);
      setLoading(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        setError(
          axiosError.response.data?.message ?? "An unknown error occurred"
        );
      } else {
        setError("An error occurred");
      }
    }
  }

  return (
    <NotesContext.Provider value={{ notes, loading, error }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);

export default NotesProvider;
