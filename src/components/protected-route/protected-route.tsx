import { useAuth } from '../../services/auth';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { FC, useEffect, useState, ReactNode } from 'react';

type TProps = { children: ReactNode } & RouteProps

export const ProtectedRoute: FC<TProps> = ({ children, ...rest }) => {
  const { getUser, ...auth } = useAuth() as any;
  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

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
