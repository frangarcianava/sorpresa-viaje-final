"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setProgress } from "@/lib/progress";
import { normalizeText } from "@/lib/normalize";
import { useGuard } from "@/hooks/useGuard";
import Modal from "@/components/Modal";

const CORRECT_ANSWER = "lagos de covadonga";

export default function Prueba1() {
  useGuard(1);

  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const checkAnswer = () => {
    const userAnswer = normalizeText(answer);
    const correct = normalizeText(CORRECT_ANSWER);

    if (userAnswer === correct) {
      setShowSuccess(true);
    } else {
      setShowError(true);
    }
  };

  const handleSuccess = () => {
    setShowSuccess(false);
    setProgress(2);
    router.push("/prueba-2");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center backdrop-blur rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold mb-6">🧩 Prueba 1</h1>

        <p className="mb-6 text-white-700">
          ¿Cuál fue uno de nuestros lugares favoritos cuando hicimos nuestra ruta
          de vacaciones por Portugal y España?
        </p>

        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Escribe tu respuesta aquí..."
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          onClick={checkAnswer}
          className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition w-full"
        >
          Comprobar
        </button>
      </div>

      {/* ❌ Modal error */}
      <Modal
        open={showError}
        message="Uy, puede haber sido, pero si hablo de VACAciones?"
        onClose={() => setShowError(false)}
      />

      {/* ✅ Modal éxito */}
      <Modal
        open={showSuccess}
        title="🎉 ¡Excelente!"
        message="¡EXCELENTE! CONTINUEMOS CON EL SIGUIENTE PASO"
        confirmText="Continuar"
        onConfirm={handleSuccess}
      />
    </main>
  );
}
