export const erLokaltMedMock = () => {
  return (
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_BRUK_API_I_DEV === 'false'
  );
};

export const erLokalt = () => {
  return process.env.ENV === 'localhost';
};
