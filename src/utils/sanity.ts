const sanityClient = require('@sanity/client');

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET,
  useCdn: true,
});
