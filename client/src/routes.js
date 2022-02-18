// import CheckPage from "./pages/Check"
import { User } from "./features/users/User.js"
import ErrorPage from "./pages/Error"
import { Home } from "./features/rooms/Home"
import { Check } from "./features/check/Check.js"
import { Room } from "./features/room/Room.js"

const routes = [
    {
        path: "/checking",
        exact: true,
        main: () => <Check />
    },
    {
        path: "/information",
        exact: true,
        main: () => <User />
    },
    {
        path: "/room/:id",
        exact: true,
        main: () => <Room />
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