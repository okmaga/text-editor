import { useEffect, useState } from "react";
import notes from "../mockData/notes.json";
import httpService from "../services/httpService";

interface AxiosError {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
}

const useMockData = () => {
  const loadingState = {
    idle: "Not started",
    pending: "In progress",
    success: "Complete"
  };
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(loadingState.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const totalCount = notes.length;

  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const updateProgress = () => {
    if (count !== 0 && status === loadingState.idle) {
      setStatus(loadingState.pending);
    }
    const newProgress = Math.floor((count / totalCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) {
      setStatus(loadingState.success);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  async function initialize(): Promise<void> {
    try {
      for (const note of notes) {
        await httpService.post("notes/", note);
        incrementCount();
      }
    } catch (e) {
      const axiosError = e as AxiosError;
      setError(
        axiosError.response?.data?.message ?? "An unknown error occurred"
      );
    }
  }

  return { error, initialize, progress, status };
};

export default useMockData;
