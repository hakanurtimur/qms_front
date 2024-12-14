export function convertObjectArrayToOptions<
  T,
  K extends keyof T,
  V extends keyof T,
>(array: T[], key: K, value: V): { [key: string]: T[V] } {
  return array.reduce(
    (options, item) => {
      options[String(item[key])] = item[value];
      return options;
    },
    {} as { [key: string]: T[V] },
  );
}
