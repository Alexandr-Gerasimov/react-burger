import { useAuth } from './auth';
import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function ProtectedRoute({ children, ...rest }) {
  console.log(children)
  let { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  console.log(isUserLoaded)

  useEffect(() => {
    init();
  }, []);

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