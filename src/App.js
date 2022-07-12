import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { ForgotPage } from "./pages/forgot-password";
import { ResetPage } from "./pages/reset-password";
import { ProfilePage } from "./pages/profile";
import { ProfileOrdersPage } from "./pages/orders";
import { ProvideAuth } from "./services/auth";
import { ProtectedRoute } from "./services/protected-route";
import { AUTH_CHECKED } from "./services/actions/profile";
import { getCookie } from "./services/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "./services/auth";

export default function App() {
  const auth = useAuth();


  const dispatch = useDispatch()
  useEffect(() => {
    if (getCookie("token")) {
      auth.getUser()
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch({type: AUTH_CHECKED});
        });
    } else {
      dispatch({type: AUTH_CHECKED});
    }
  }, []);

  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPage />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPage />
          </Route>
          <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders" exact={true}>
            <ProfileOrdersPage />
          </ProtectedRoute>
          <Route path={`/ingredients/:id`} exact={true}></Route>
          <Route></Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}
