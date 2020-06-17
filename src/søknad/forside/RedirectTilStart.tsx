import React from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';
import { useSøknad } from '../../context/SøknadContext';

interface RedirectTilStartProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}
const RedirectTilStart: React.FC<RedirectTilStartProps> = ({
  component: Component,
  ...rest
}) => {
  const { søknad } = useSøknad();
  return (
    <Route
      {...rest}
      render={(props) =>
        !søknad.harBekreftet ? <Redirect to={'/'} /> : <Component {...props} />
      }
    />
  );
};

export default RedirectTilStart;
