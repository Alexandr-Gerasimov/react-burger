import { useAuth } from '../../services/auth';
import { Redirect, Route, useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function ProtectedRoute({ children, ...rest }) {
  const { getUser, ...auth } = useAuth();
  const location = useLocation();
  const history = useHistory()
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
