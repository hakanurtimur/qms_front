export const allowedPaths: (string | RegExp)[] = [
  "/login",
  "/admin-login",
  /^\/modules\/?.*/,
];

export const isPathAllowed = (pathname: string): boolean => {
  return allowedPaths.some((allowedPath) => {
    if (typeof allowedPath === "string") {
      return allowedPath === pathname;
    } else {
      return allowedPath.test(pathname);
    }
    return false;
  });
};
