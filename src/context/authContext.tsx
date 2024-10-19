import React, { createContext, useContext, useEffect, useState } from "react";
import tokenService from "@/services/TokenService";
import authService from "@/services/AuthService";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/models/user";
import { isPathAllowed } from "@/constants/allowedPaths";

interface AuthContextProps {
  isAuthenticated: boolean | null;
  onSetAuthenticated: (value: boolean) => void;
  user: User | null;
  onSetUser: (value: User) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const handleSetAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const [user, setUser] = useState<User | null>(null);

  const handleSetUser = (value: User) => {
    setUser(value);
  };

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      if (tokenService.isAccessTokenExpired()) {
        setIsAuthenticated(false);
        authService.logout();
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [router]);

  // Route protection
  useEffect(() => {
    if (!isAuthenticated) {
      if (!isPathAllowed(pathname)) {
        router.push("/login");
      }
    } else {
      if (
        pathname === "/login" ||
        pathname === "/admin-login" ||
        pathname === "/"
      ) {
        // TODO role check
        router.push("/user");
      }
    }
  }, [pathname, isAuthenticated, router]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        onSetAuthenticated: handleSetAuthenticated,
        user,
        onSetUser: handleSetUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};