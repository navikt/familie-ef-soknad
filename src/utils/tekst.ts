export const storeForbokstaver = (tekster: string[]): string => {
  const tekst = tekster.filter((s) => s).join(' ');
  return tekst
    .split(' ')
    .map((ord) =>
      ord
        .split('-')
        .map(
          (navn) => navn.charAt(0).toUpperCase() + navn.slice(1).toLowerCase()
        )
        .join('-')
    )
    .join(' ');
};
