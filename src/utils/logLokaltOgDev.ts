import Environment from '../Environment';

export const consoleLogLokaltOgDev = (melding: any, sted?: string): void => {
  const miljø = Environment().miljø;
  if (miljø === 'local' || miljø === 'preprod') {
    console.log(sted && `${sted}: `, melding);
  }
};
