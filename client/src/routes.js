// import CheckPage from "./pages/Check"
import { User } from "./features/users/User.js"
import ErrorPage from "./pages/Error"
import { Home } from "./features/rooms/Home"

const routes = [
    // {
    //     path: "/check",
    //     exact: true,
    //     main: () => <CheckPage />
    // },
    {
        path: "/information",
        exact: true,
        main: () => <User />
    },
    {
        path: "/",
        exact: true,
        main: () => <Home />
    },
    {
        path: "",
        exact: false,
        main: () => <ErrorPage />
    }
]


export default routes;