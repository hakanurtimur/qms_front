export const allowedPaths: (string | RegExp)[] = [
  "/login",
  "/admin-login",
  "/forgot-password",
  "/modules/1",
  "/modules/2",
  "/modules/3",
  "/modules",
];

export const isPathAllowed = (pathname: string) => {
  if (allowedPaths.includes(pathname)) return true;
};
