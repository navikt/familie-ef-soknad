import React from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';
import { useBarnetilsynSøknad } from './BarnetilsynContext';

interface RedirectTilStartProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}
const RedirectTilStart: React.FC<RedirectTilStartProps> = ({
  component: Component,
  ...rest
}) => {
  const { søknad } = useBarnetilsynSøknad();
  return (
    <Route
      {...rest}
      render={(props) =>
        !søknad.harBekreftet ? (
          <Redirect to={'/barnetilsyn'} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RedirectTilStart;
