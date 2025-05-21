"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

interface AuthContextType {
  user: {
    id: string;
    email: string | undefined;
    phone?: string | undefined;
    name?: string | undefined;
  } | null;
  setUser: (
    user: {
      id: string;
      email: string | undefined;
      phone?: string | undefined;
      name?: string | undefined;
    } | null
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const router = useRouter();

  const setUserFunc = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      router.push("/login");
      return;
    }

    const { data: personalData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.session.user.id)
      .single();

    if (!personalData) return;

    setUser({
      id: data.session.user.id,
      email: data.session.user.email,
      phone: personalData.phone,
      name: personalData.name,
    });
  }, [router]);

  useEffect(() => {
    setUserFunc();
  }, [setUserFunc]);

  // Realtime auth listener
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const { data: personalData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          setUser({
            id: session.user.id,
            email: session.user.email,
            phone: personalData?.phone,
            name: personalData?.name,
          });
        } else {
          setUser(null);
          router.push("/login");
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
