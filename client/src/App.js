import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import "./App.css"
import routes from "./routes";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import configureStore from "./redux/configReducer";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from "./pages/PrivateRoutes";
const store = configureStore()
const showContentMenus = (routes) => {
  var result = null;
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      // if (route.path === "/login")
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main} />
        )
      // return (
      //   <PrivateRoutes
      //     key={index}
      //     path={route.path}
      //     component={route.main}
      //     exact={route.exact}
      //   />

      // )
    })
  }
  return result;
}
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {/*  renders nothing for the / and /login routes, but renders the Header component for every other route. */}
          <Route exact path="/login" />
          <Route path="/" component={Header} />
        </Switch>
        <div className="container">
          <Switch>
            {showContentMenus(routes)}
          </Switch>
          <ToastContainer />
        </div>
        <Switch>
          {/*  renders nothing for the / and /login routes, but renders the Header component for every other route. */}
          <Route exact path="/login" />
          <Route path="/" component={Footer} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
