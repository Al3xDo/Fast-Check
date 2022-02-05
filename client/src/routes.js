// import CheckPage from "./pages/Check"
// import UserPage from "./pages/User"
import ErrorPage from "./pages/Error"
import { Home } from "./features/rooms/Home"

const routes = [
    {
        path: "/",
        exact: true,
        main: () => <Home />
    },
    // {
    //     path: "/check",
    //     exact: true,
    //     main: () => <CheckPage />
    // },
    // {
    //     path: "/information",
    //     exact: true,
    //     main: () => <UserPage />
    // },
    {
        path: "",
        exact: false,
        main: () => <ErrorPage />
    }
]


export default routes;