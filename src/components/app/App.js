import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { Home } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ForgotPage } from "../../pages/forgot-password";
import { ResetPage } from "../../pages/reset-password";
import { ProfilePage } from "../../pages/profile";
import { ProfileOrdersPage } from "../../pages/orders";
import { ProvideAuth } from "../../services/auth";
import { ProtectedRoute } from "../protected-route/protected-route";
import IngredientDetails from "../ingredient-details/ingredietn-details";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/modal";
import { getAllItems } from "../../services/actions";
import AppHeader from "../app-header/app-header";

export default function App() {
  const location = useLocation();
  const background = location.state?.background;
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  const ingredient = useSelector((store) => store.fillings.ingredient);

  const closeIngredientModal = () => {
    history.goBack();
  };

  return (
    <ProvideAuth>
      <AppHeader />
      <Switch location={background || location}>
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
        <Route path="/ingredients/:id">
          <IngredientDetails ingredient={ingredient} />
        </Route>
      </Switch>
      {background && (
        <Route
          path="/ingredients/:id"
          children={
            <Modal onClick={closeIngredientModal}>
              <IngredientDetails ingredient={ingredient} />
            </Modal>
          }
        />
      )}
    </ProvideAuth>
  );
}
