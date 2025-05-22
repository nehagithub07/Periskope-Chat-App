"use client";

import { createProfile } from "@/src/actions/createProfile";
import PassInput from "../../components/inputs/PassInput";
import TextInput from "../../components/inputs/TextInput";
import { supabase } from "../../lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const router = useRouter();

const handleSignup = async () => {
  if (!email || !password) {
    alert("Please fill in both email and password.");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
    createProfile(email, phone, name);
 
  if (error) {
    console.log("Signup error: " + error.message);
    return;
  }

  alert("Signup successful! Please check your email to confirm.");
};

  return (
    <div className="w-full h-screen flex flex-1">
      <div className="flex-[0.5] w-full h-full bg-ws-green-200 flex items-center justify-center">
        <Image src="/logo.png" width={200} height={200} alt="Logo" />
      </div>

      <div className="flex-[0.5] w-full h-full flex items-center justify-center">
        <div className="w-[60%] text-center">
          <h1 className="text-3xl font-semibold">Sign up</h1>

          <div className="my-10 w-full space-y-4">
            <TextInput value={name} setValue={setName} placeholder="Name" />
            <TextInput
              value={email}
              setValue={setEmail}
              placeholder="Email"
              type="email"
            />
            <TextInput
              value={phone}
              setValue={setPhone}
              placeholder="Phone Number"
            />
            <PassInput password={password} setPassword={setPassword} />
          </div>

          <button
            onClick={handleSignup}
            className="w-full bg-ws-green-200 py-2 rounded-md text-white hover:opacity-90 transition"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
