export const erLokaltMedMock = () => {
  console.log(process.env.NODE_ENV)
  console.log(process.env.REACT_APP_BRUK_API_I_DEV )
  return (
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_BRUK_API_I_DEV === 'false'
  );
};
