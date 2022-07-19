import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
  Redirect
} from "react-router-dom";
import { Home } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { ForgotPage } from "./pages/forgot-password";
import { ResetPage } from "./pages/reset-password";
import { ProfilePage } from "./pages/profile";
import { ProfileOrdersPage } from "./pages/orders";
import { ProvideAuth } from "./services/auth";
import { ProtectedRoute } from "./services/protected-route";
import IngredientDetails from "./components/ingredient-details/ingredietn-details"
import { AUTH_CHECKED } from "./services/actions/profile";
import { getCookie } from "./services/utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "./services/auth";
import Modal from "./components/modal/modal";
import { closeIngredientModals, getAllItems } from "./services/actions";
import { setCookie } from "./services/utils";

export default function App() {
  const location = useLocation();
  const background = location.state?.background;
  const history = useHistory();
  const auth = useAuth();
  
  const ingredientsModal = useSelector(
    (state) => state.fillings.ingredientsModal
  );
  const init = async () => {
    return await auth.getUser();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllItems())
  }, []);

  const ingredient = useSelector((store) => store.fillings.ingredient);

  const closeIngredientModal = () => {
    history.goBack();
  };

  return (
    <ProvideAuth>
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
          children=
            {
              <Modal onClick={closeIngredientModal}>
                <IngredientDetails ingredient={ingredient} />
              </Modal>
            }
          
        />
      )}
    </ProvideAuth>
  );
}
