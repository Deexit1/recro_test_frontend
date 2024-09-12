import {
    createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./routes/Login";
import RegisterPage from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import EmployeesPage from "./routes/candidates";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/candidates",
        element: <EmployeesPage />
    }
]);

