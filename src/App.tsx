import { RootLayout } from "./layouts/Root";
import { Routes, Route } from "react-router-dom";
import { SignupPage } from "./pages/Signup";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { MockPage } from "./pages/Mock";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mock" element={<MockPage />} />
      </Route>
    </Routes>
  );
};

export default App;
