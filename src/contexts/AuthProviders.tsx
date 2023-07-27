"use client";

import AuthService from "@/services/AuthService";
import { AuthModel } from "@/types";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useState } from "react";

const DefaultProps = {
  auth: {},
  setAuth: () => null,
  login: () => null,
  logout: () => null,
};

export interface AuthProps {
  auth: any;
  setAuth: (auth: any) => void;
  login: (app_id: string, app_secret: string) => any;
  logout: () => void;
}

export const AuthContext = createContext<AuthProps>(DefaultProps);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<AuthModel | null>();
  const router = useRouter();

  async function login(app_id: string, app_secret: string) {
    const data = await AuthService.login(app_id, app_secret);
    return data;
  }

  function logout() {
    setAuth(null);
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
