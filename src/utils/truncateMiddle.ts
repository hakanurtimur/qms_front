export function truncateMiddle(filename: string, maxLength: number): string {
  if (filename.length <= maxLength) {
    return filename;
  }

  const extMatch = filename.match(/\.[^.]+$/);
  const extension = extMatch ? extMatch[0] : "";
  const filenameWithoutExt = filename.slice(
    0,
    filename.length - extension.length,
  );

  const charsToShow = maxLength - extension.length - 3; // 3 for '...'
  if (charsToShow <= 0) {
    return "..." + extension;
  }

  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  const truncated =
    filenameWithoutExt.slice(0, frontChars) +
    "..." +
    filenameWithoutExt.slice(filenameWithoutExt.length - backChars);

  return truncated + extension;
}
