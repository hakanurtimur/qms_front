export function formatPathname(pathname: string): string {
  const segments = pathname.split("/");
  const lastSegment = segments[segments.length - 1];

  const finalSegment =
    lastSegment === "" ? segments[segments.length - 2] : lastSegment;

  if (finalSegment.includes("-")) {
    return finalSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    return finalSegment.charAt(0).toUpperCase() + finalSegment.slice(1);
  }
}
