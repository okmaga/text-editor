import { RootLayout } from "./layouts/Root";
import { Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
};

export default App;
