import React from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';
import { useSkjema } from '../SkjemaContext';
import { RoutesArbeidssokerskjema } from './routesArbeidssokerskjema';

interface RedirectProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}
const RedirectArbeidssoker: React.FC<RedirectProps> = ({
  component: Component,
  ...rest
}) => {
  const { skjema } = useSkjema();
  return (
    <Route
      {...rest}
      render={(props) =>
        !skjema.harBekreftet ? (
          <Redirect to={RoutesArbeidssokerskjema[0].path} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RedirectArbeidssoker;
