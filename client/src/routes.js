import HomePage from "./pages/Home"
import UserFormPage from "./pages/UserForm"
import CheckPage from "./pages/Check"
import UserPage from "./pages/User"
import ErrorPage from "./pages/Error"


const routes = [
    {
        path: "/login",
        exact: true,
        main: () => <UserFormPage />
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