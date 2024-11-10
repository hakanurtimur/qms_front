export function convertStringArrayToOptions(items: string[]): {
  [key: string]: string;
} {
  const options: { [key: string]: string } = {};

  for (const name of items) {
    options[name] = name;
  }

  return options;
}
