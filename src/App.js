import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { ForgotPage } from "./pages/forgot-password";
import { ResetPage } from "./pages/reset-password";
import { ProfilePage } from "./pages/profile";
import { ProfileOrdersPage } from "./pages/orders";

export default function App() {
  return (
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
        <Route path="/profile" exact={true}>
          <ProfilePage />
        </Route>
        <Route path="/profile/orders" exact={true}>
          <ProfileOrdersPage />
        </Route>
        <Route path={`/ingredients/:id`} exact={true}></Route>
        <Route></Route>
      </Switch>
    </Router>
  );
}
