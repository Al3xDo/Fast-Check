// import CheckPage from "./pages/Check"
import { User } from "./features/users/User.js"
import ErrorPage from "./pages/Error"
import { Home } from "./features/rooms/Home"
import { Check } from "./features/check/Check.js"
import { RoomReport } from "./features/report/RoomReport.js"
import { ReportHistory } from "./features/report/ReportHistory.js"

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
        main: () => <RoomReport />
    },
    {
        path: "/room/history/:id",
        exact: true,
        main: () => <ReportHistory />
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