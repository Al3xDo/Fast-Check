import { BrowserRouter, BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import "./App.css"
import routes from "./routes";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import { store } from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PrivateRoute } from "./components/PrivateRoute";
import { LogIn, SignUp } from "./features/auth";
const showContentMenus = (routes) => {
  var result = null;
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      if (route.path === "/login") {
        return
      }
      return (
        <PrivateRoute
          key={index}
          path={route.path}
          exact={route.exact}
        >
          <Header />
          {route.main()}
          <Footer />
        </PrivateRoute>
      )
    })
  }
  return result;
}
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <BrowserRouter>
            <Switch>
              <Route path="/login" exact={true}>
                <LogIn />
              </Route>
              <Route path="/signup" exact={true}>
                <SignUp />
              </Route>
              {showContentMenus(routes)}
            </Switch>
          </BrowserRouter>
          <ToastContainer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
