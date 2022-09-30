import { React } from "react";
import { useRoutes } from "react-router-dom";
import DrawerHeader from "./components/DrawerHeader/DrawerHeader";
import Forgot from "./components/Forgot/Forgot";
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import Info from "./pages/Info/Info";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Reset from "./pages/Reset/Reset";
import Verification from "./pages/Verification/Verification";
import VerifyRegister from "./pages/Verification/Verification_register";

function App() {
    const element = useRoutes([
        {
            path: "",
            element: <Auth />,
            children: [
                { path: "", element: <Login /> },
                { path: "forgot", element: <Forgot /> },
                { path: "register", element: <Register /> },
                { path: "reset", element: <Reset /> },
                { path: "verification", element: <Verification /> },
                { path: "verifyRegister", element: <VerifyRegister /> },
            ],
        },

        {
            path: "dashboard",
            element: <DrawerHeader />,
            children: [
                { path: "", element: <Dashboard /> },
                { path: "personal-info", element: <Info /> },
            ],
        },
    ]);

    return (
        <div
          className="flow-root overflow-x-hidden"
          style={{
            backgroundColor: '#141041',
            backgroundImage: "url('/backgroundImages/home-page-bg-lights.webp')",
            backgroundSize: '100% 95%',
            backgroundRepeat: 'no-repeat',
            color: 'white',
          }}
        >
          <div
            style={{
              backgroundImage: "url('/backgroundImages/home-footer-bg.webp')",
              backgroundSize: '100% 10%',
              backgroundRepeat: 'no-repeat',
              color: 'white',
              minHeight: "100vh",
              backgroundPositionY: "bottom"
          }}>
            {element}
          </div>          
        </div>
      )
}

export default App;
