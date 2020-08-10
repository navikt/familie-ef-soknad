export const erStrengGyldigTall = (input: string | undefined): boolean => {
  return input !== undefined && /^\d+\.?,?\d*$/.test(input);
};
