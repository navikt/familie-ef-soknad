export const erStrengGyldigTall = (input: string | undefined): boolean => {
  const erInputDesimaltall =
    input !== undefined ? /^\d+\.?,?\d*$/.test(input) : false;
  return input !== undefined && erInputDesimaltall;
};
