"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function WelcomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const success = searchParams.get("loginSuccess");

    if (success === "true") {
      // 💥 BIG CONFETTI BLAST
      const duration = 2500;
      const end = Date.now() + duration;

      const fire = () => {
        confetti({
          particleCount: 6,
          spread: 80,
          origin: { x: 0 },
        });

        confetti({
          particleCount: 6,
          spread: 80,
          origin: { x: 1 },
        });

        if (Date.now() < end) {
          requestAnimationFrame(fire);
        }
      };

      fire();

      // clean URL
      router.replace("/welcome");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200">

      <div className="bg-white shadow-xl rounded-2xl p-8 text-center w-[400px]">

        <h1 className="text-3xl font-bold text-green-700 mb-3">
          🎉 Welcome Back!
        </h1>

        <p className="text-gray-600 mb-5">
          Login successful. Enjoy your dashboard 🚀
        </p>

        <button
          onClick={() => router.push("/")}
          className="bg-[#556b4f] text-white px-5 py-2 rounded-lg hover:bg-[#44563f]"
        >
          Go Home
        </button>

      </div>

    </div>
  );
}