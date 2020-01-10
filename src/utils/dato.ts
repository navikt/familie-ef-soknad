export const hentÅrstall = () => {
  let årstall = [];
  const dato = new Date().getFullYear();
  for (let i = 0; i < 125; i++) {
    årstall.push(dato - i);
  }
  return { årstall };
};
