import HomePage from "./pages/Home"
import UserFormPage from "./pages/UserForm"
import CheckPage from "./pages/Check"
import UserPage from "./pages/User"
import ErrorPage from "./pages/Error"
import { SignUp, LogIn } from './features/auth'

const routes = [
    {
        path: "/signup",
        exact: true,
        main: () => <SignUp />
    },
    {
        path: "/login",
        exact: true,
        main: () => <LogIn />
    },
    {
        path: "/",
        exact: true,
        main: () => <HomePage />
    },
    {
        path: "/check",
        exact: true,
        main: () => <CheckPage />
    },
    {
        path: "/information",
        exact: true,
        main: () => <UserPage />
    },
    {
        path: "",
        exact: false,
        main: () => <ErrorPage />
    }
]


export default routes;