export function routeNameGenerator(text: string) {
  let routeName = text.toLowerCase();

  const turkishChars: {
    [key: string]: string;
  } = {
    ğ: "g",
    ü: "u",
    ş: "s",
    ı: "i",
    ö: "o",
    ç: "c",
    Ğ: "g",
    Ü: "u",
    Ş: "s",
    İ: "i",
    Ö: "o",
    Ç: "c",
  };
  routeName = routeName.replace(/ğ|ü|ş|ı|ö|ç|Ğ|Ü|Ş|İ|Ö|Ç/g, function (match) {
    return turkishChars[match];
  });

  routeName = routeName.replace(/[^a-z0-9\s-]/g, "");

  routeName = routeName.replace(/\s+/g, " ");

  routeName = routeName.replace(/\s/g, "-");

  routeName = routeName.replace(/-+/g, "-");

  routeName = routeName.replace(/^-+|-+$/g, "");

  return routeName;
}
