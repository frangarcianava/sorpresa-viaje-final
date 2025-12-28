"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGuard } from "@/hooks/useGuard";
import { setProgress } from "@/lib/progress";
import { normalizeText } from "@/lib/normalize";
import Modal from "@/components/Modal";
import Image from "next/image";

const CORRECT_PLACE = "cuesta de lipan";

const MESSAGES = {
  hint: "A veces no hace falta ver la imagen completa, para saber de qué lugar estamos hablando",
  error: "ERROR. Pero tranquila que te voy a ir mostrando más partes...",
  error2: "Está dificil, ¿verdad? Intentalo de nuevo.",
  error3: "Con esta capaz la sacas, o no...",
  error4: "Dale que después de éste te queda el último intento!!!!",
  error5: "Ahora seguro que si la sacas",
  lastChance: "Voy a ser bueno y te voy a mostrar la foto completa",
  success: "¡Exacto! Sabía que lo ibas a reconocer 💖",
};

// 🔁 Devuelve el mensaje según el intento actual
const getErrorMessage = (attempt: number) => {
  switch (attempt) {
    case 1:
      return MESSAGES.error;
    case 2:
      return MESSAGES.error2;
    case 3:
      return MESSAGES.error3;
    case 4:
      return MESSAGES.error4;
    case 5:
      return MESSAGES.error5;
    default:
      return MESSAGES.error;
  }
};

export default function Prueba3() {
  useGuard(3);

  const router = useRouter();

  const [answer, setAnswer] = useState("");
  const [attempts, setAttempts] = useState(1);
  const [showFull, setShowFull] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showLastChanceModal, setShowLastChanceModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const checkAnswer = () => {
    const user = normalizeText(answer);
    const correct = normalizeText(CORRECT_PLACE);

    if (user === correct) {
      setShowFull(true);
      setShowSuccessModal(true);
      return;
    }

    if (attempts < 5) {
      setShowErrorModal(true);
      setAttempts((prev) => prev + 1);
    } else {
      setShowFull(true);
      setShowLastChanceModal(true);
    }
  };

  const handleSuccess = () => {
    setShowSuccessModal(false);
    setProgress(4);
    router.push("/prueba-4");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full backdrop-blur rounded-2xl p-8 shadow-xl text-center">
        <h1 className="text-2xl font-bold mb-4">🖼️ Prueba 3</h1>

        <p className="text-white-700 mb-6">{MESSAGES.hint}</p>

        {/* 🖼️ IMÁGENES */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {!showFull &&
            Array.from({ length: attempts }).map((_, index) => (
              <div key={index} className="aspect-square relative">
                <Image
                  src={`/prueba-3/pieza-${index + 1}.jpg`}
                  alt={`Pieza ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}

          {showFull && (
            <div className="col-span-3 relative aspect-[4/3]">
              <Image
                src="/prueba-3/completa.jpg"
                alt="Imagen completa"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          )}
        </div>

        {/* 📝 INPUT */}
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="¿Qué lugar es?"
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          onClick={checkAnswer}
          className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition w-full"
        >
          Comprobar
        </button>
      </div>

      {/* ❌ Error (mensaje dinámico según intento) */}
      <Modal
        open={showErrorModal}
        message={getErrorMessage(attempts)}
        onClose={() => setShowErrorModal(false)}
      />

      {/* ⚠️ Última oportunidad */}
      <Modal
        open={showLastChanceModal}
        message={MESSAGES.lastChance}
        confirmText="Intentar de nuevo"
        onConfirm={() => setShowLastChanceModal(false)}
      />

      {/* ✅ Éxito */}
      <Modal
        open={showSuccessModal}
        title="🎉 ¡Bien!"
        message={MESSAGES.success}
        confirmText="Continuar"
        onConfirm={handleSuccess}
      />
    </main>
  );
}
