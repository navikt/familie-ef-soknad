export const erLokaltMedMock = () => {
  return (
    process.env.NODE_ENV === 'development' &&
    process.env.BRUK_MOCK_LOKALT === 'true'
  );
};
