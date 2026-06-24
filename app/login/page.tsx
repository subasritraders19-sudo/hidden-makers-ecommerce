"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data?.user) {
      router.push("/welcome?loginSuccess=true");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200">

      {/* Background Blur */}
      <div className="absolute w-[300px] h-[300px] bg-green-300 rounded-full blur-3xl opacity-30 top-10 left-10"></div>
      <div className="absolute w-[300px] h-[300px] bg-green-400 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>

      {/* Login Card */}
      <div className="relative w-[420px] bg-white p-8 shadow-xl rounded-2xl border border-gray-100">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#556b4f] hover:bg-[#44563f] transition text-white py-3 rounded-lg font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-5 text-sm text-gray-600">
          Don’t have account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-green-700 font-medium hover:underline"
          >
            Create Account
          </button>
        </p>

      </div>
    </div>
  );
}