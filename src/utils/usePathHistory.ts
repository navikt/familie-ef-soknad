import { useHistory, useLocation } from 'react-router-dom';
import React, { FC, useEffect, useState } from 'react';

export const usePathHistory = (initialState = false) => {
  // Initialize the state

  const [pathHistory, setPathHistory] = useState<any>([]);

  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === 'PUSH') {
        setPathHistory([location.pathname]);
      }

      if (history.action === 'POP') {
        setPathHistory((keys: any) => [location.pathname, ...keys]);
      }
    });
  }, [pathHistory]);

  return pathHistory;
};
