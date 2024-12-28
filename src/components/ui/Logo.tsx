import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <div
      className={
        "font-bold flex justify-center items-center text-3xl text-primary-900 cursor-pointer " +
        className
      }
      onClick={() => {
        if (pathname.includes("user")) {
          window.location.href = "/user";
        } else if (
          pathname.includes("admin") &&
          !pathname.includes("admin-login")
        ) {
          window.location.href = "/admin";
        }
      }}
    >
      {/* Logo Siyah */}
      {(pathname.includes("login") || pathname.includes("admin-login")) && (
        <Image src="/icons/logo-white.png" alt="Logo" width={288} height={72} />
      )}

      {/* Logo Beyaz */}
      {(pathname.includes("user") ||
        (pathname.includes("admin") && !pathname.includes("admin-login"))) && (
        <Image src="/icons/logo-white.png" alt="Logo" width={288} height={72} />
      )}
    </div>
  );
};

export default Logo;
