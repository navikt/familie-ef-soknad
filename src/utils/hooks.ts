import { useEffect, useRef, useState } from 'react';
import { client } from './sanity';
import { ForsideType } from '../models/søknad/stønadstyper';

export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useForsideInnhold = (stønadstype: ForsideType): any => {
  const [innhold, settInnhold] = useState({});
  useEffect(() => {
    client
      .fetch('*[_type == $type][0]', { type: stønadstype })
      .then((res: any) => {
        settInnhold(res);
      });
    // eslint-disable-next-line
  }, []);
  return innhold;
};
