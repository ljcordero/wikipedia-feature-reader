export const replaceNewLinesWith = (
  value: string,
  replaceValue: string,
): string => {
  return value.replace(/(?:\r\n|\r|\n)/g, replaceValue);
};
