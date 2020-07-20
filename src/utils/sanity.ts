const sanityClient = require('@sanity/client');

export const client = sanityClient({
  projectId: 'm3pb011r',
  dataset: 'test',
  useCdn: true,
});
