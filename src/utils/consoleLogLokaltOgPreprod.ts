import Environment from '../Environment';

export const consoleLogLokaltOgPreprod = (object: any, hva?: string): void => {
  const miljø = Environment().miljø;
  if (miljø === 'local' || miljø === 'preprod') {
    hva = hva ?? `${object}: `;
    console.log(`${hva}: `, object);
  }
};
