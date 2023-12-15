import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import AuthProvider from "./context/AuthProvider.tsx";
import NotesProvider from "./context/NotesProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <NotesProvider>
        <MantineProvider>
          <App />
        </MantineProvider>
      </NotesProvider>
    </AuthProvider>
  </BrowserRouter>
);
