import React from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';
import { useSkolepengerSøknad } from './SkolepengerContext';

interface RedirectTilStartProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}
const RedirectTilStart: React.FC<RedirectTilStartProps> = ({
  component: Component,
  ...rest
}) => {
  const { søknad } = useSkolepengerSøknad();
  return (
    <Route
      {...rest}
      render={(props) =>
        !søknad.harBekreftet ? (
          <Redirect to={'/skolepenger'} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RedirectTilStart;
