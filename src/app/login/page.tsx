"use client";

import PassInput from "../../components/inputs/PassInput";
import TextInput from "../../components/inputs/TextInput";
import { useAuthContext } from "../../context/authContext";
import { supabase } from "../../lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = useAuthContext();
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error);
      alert("Error logging in: " + error.message);
      return;
    }

    if (data?.user) {
      setUser({
        id: data.user.id,
        email: data.user.email ?? undefined,
      });
      router.push("/");
    }
  };


  return (
    <div className="w-full h-screen flex">
      <div className="flex-[0.5] w-full h-full bg-ws-green-200 flex items-center justify-center">
        <Image src="/logo.png" width={200} height={200} alt="Logo" />
      </div>

      <div className="flex-[0.5] w-full h-full flex items-center justify-center">
        <div className="w-[60%] text-center">
          <h1 className="text-3xl font-semibold">Login</h1>

          <div className="my-10 w-full space-y-4">
            <TextInput
              value={email}
              setValue={setEmail}
              placeholder="Email"
              type="email"
            />
            <PassInput password={password} setPassword={setPassword} />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-ws-green-200 py-2 rounded-md text-white hover:opacity-90 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
