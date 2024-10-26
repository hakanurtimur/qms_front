export const toKebabCase = (str: string): string => {
  return str
    .toLocaleLowerCase("tr")
    .trim()
    .replace(/[^a-z0-9ğüşöçıİĞÜŞÖÇ ]/gi, "")
    .replace(/\s+/g, "-");
};
