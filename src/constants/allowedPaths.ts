export const allowedPaths: (string | RegExp)[] = [
  "/login",
  "/admin-login",
  "/modules/hasta-geri-bildirim",
  "/modules/olay-bildirimi",
  "/modules/dokumanlar",
];

export const isPathAllowed = (pathname: string) => {
  if (allowedPaths.includes(pathname)) return true;
};
