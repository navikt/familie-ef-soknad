import { useEffect, useRef, useState } from 'react';
import { client } from './sanity';

export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useForsideInnhold = (stønadstype: string): any => {
  const [innhold, settInnhold] = useState({});
  useEffect(() => {
    client
      .fetch('*[_type == $type][0]', { type: stønadstype })
      .then((res: any) => {
        settInnhold(res);
      });
  }, []);
  return innhold;
};
