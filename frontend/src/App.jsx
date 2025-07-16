import { Outlet } from "@tanstack/react-router";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet/>
    </div>
  );
};
export default App;
