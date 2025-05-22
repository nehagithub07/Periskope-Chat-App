"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import path from "path";

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
  const [user, setUser] = useState<{
    id: string;
    email: string | undefined;
    phone?: string | undefined;
    name?: string | undefined;
  } | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUserAndSet = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error && pathname != '/signup') {
      console.error("Error fetching session:", error);
      router.push("/login");
      return;
    }

    if (!data.session?.user) {
      // No user session found
      setUser(null);
    
      if(pathname != '/signup') {
         router.push("/login");
      }
     
      return;
    }

    const userId = data.session.user.id;

    const { data: personalData, error: personalError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (personalError) {
      console.error("Error fetching profile:", personalError);
      // Optionally handle error, e.g. logout user or set user without profile
      setUser({
        id: userId,
        email: data.session.user.email,
      });
      return;
    }

    if (!personalData) {
      console.warn("No profile found for user id", userId);
      setUser({
        id: userId,
        email: data.session.user.email,
      });
      return;
    }

    setUser({
      id: userId,
      email: data.session.user.email,
      phone: personalData.phone,
      name: personalData.name,
    });

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            phone: personalData.phone,
            name: personalData.name,
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

  useEffect(() => {
    fetchUserAndSet();
  }, [fetchUserAndSet]);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login"); // Redirect to login page after logout
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
