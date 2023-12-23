import React, { useState, useContext, ReactNode, useEffect } from "react";
import notesService from "../services/notesService";
import { Note } from "../types/custom";
import { useAuth } from "./AuthProvider";
import { nanoid } from "nanoid";
import _ from "lodash";
import { localStorageService } from "../services/localStorageService";

interface NotesContextType {
  notes: Note[] | undefined | null;
  loading: boolean;
  error: string | object | null;
  createNote: (data: Pick<Note, "title" | "body">) => void;
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
  const { user } = useAuth();
  const userId = localStorageService.getUserId();

  useEffect(() => {
    if (!user) {
      setNotes(null);
      return;
    }
    getNotesList(userId);
  }, [user]);

  async function createNote(data: Pick<Note, "title" | "body">) {
    const note = {
      ...data,
      userId: user?._id,
      _id: nanoid(),
      timestamp: Date.now()
    };
    try {
      const { content } = await notesService.create(note);
      setNotes([content, ...(Array.isArray(notes) ? notes : [])]);
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

  async function getNotesList(userId: string | null) {
    try {
      const { content } = await notesService.get(userId);
      const sortedNotes = _.sortBy(content, ["timestamp"]).reverse();
      setNotes(sortedNotes);
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
    <NotesContext.Provider value={{ notes, loading, error, createNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);

export default NotesProvider;
