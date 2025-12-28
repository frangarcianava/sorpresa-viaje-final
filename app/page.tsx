"use client";

import { useRouter } from "next/navigation";
import { setProgress } from "@/lib/progress";

export default function Home() {
  const router = useRouter();

  const start = () => {
    setProgress(1);
    router.push("/prueba-1");
  };

  return (
    <main className="min-h-screen flex items-center justify-center text-center px-6">
      <div className="max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-[#a8dcd9]">
          Tengo algo muy importante que contarte 💖
        </h1>
        <p className="mb-8 text-white-700">
          Para descubrirlo tendrás que superar 4 pequeñas pruebas.
        </p>
        <button
          onClick={start}
          className="bg-pink-500 text-white px-6 py-3 rounded-xl text-lg hover:bg-pink-600 transition"
        >
          Empezar
        </button>
      </div>
    </main>
  );
}
