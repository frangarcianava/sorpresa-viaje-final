"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGuard } from "@/hooks/useGuard";
import { setProgress } from "@/lib/progress";
import { normalizeText } from "@/lib/normalize";
import Modal from "@/components/Modal";

const CORRECT_SONG = "En un solo dia"; 

export default function Prueba2() {
  useGuard(2);

  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [answer, setAnswer] = useState("");
  const [attempt, setAttempt] = useState<1 | 2 | 3>(1);

  const [showError, setShowError] = useState(false);
  const [showLastTryModal, setShowLastTryModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const checkAnswer = () => {
    const userAnswer = normalizeText(answer);
    const correct = normalizeText(CORRECT_SONG);

    if (userAnswer === correct) {
      setShowSuccess(true);
      return;
    }

    // ❌ Fallos
    if (attempt === 1) {
      setAttempt(2);
      setShowError(true);
    } else if (attempt === 2) {
      setAttempt(3);
      setShowLastTryModal(true);
    }
  };

  const playSong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleSuccess = () => {
    setShowSuccess(false);
    setProgress(3);
    router.push("/prueba-3");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full backdrop-blur rounded-2xl p-8 shadow-xl text-center">
        <h1 className="text-2xl font-bold mb-4">🎶 Prueba 2</h1>

        <p className="text-white-700 mb-6">
          <strong>Ésta elección fue dificil...</strong><br />
          Pero es una de las canciones de la <em>first season</em> que está
          en las primeras 10 de nuestra playlist.<br />
          <strong>PISTA:</strong> No es de artista español...
        </p>

        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Nombre de la canción..."
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          onClick={checkAnswer}
          className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition w-full"
        >
          Comprobar
        </button>

        {/* 🎧 Último intento */}
        {attempt === 3 && (
          <div className="mt-6">
            <button
              onClick={playSong}
              className="bg-gray-800 text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition w-full"
            >
              ▶️ Reproducir
            </button>

            <audio ref={audioRef}>
              <source src="/cancion.mp3" type="audio/mpeg" />
              Tu navegador no soporta audio.
            </audio>
          </div>
        )}
      </div>

      {/* ❌ Modal fallo 1 */}
      <Modal
        open={showError}
        message="Mmm no... te doy un intento más con pista: Tenemos muchas canciones de ésta banda"
        onClose={() => setShowError(false)}
      />

      {/* ❌ Modal fallo 2 */}
      <Modal
        open={showLastTryModal}
        message="Casi... Pero te doy un último intento reproduciendo un pedacito de la canción..."
        confirmText="Escuchar pista"
        onConfirm={() => setShowLastTryModal(false)}
      />

      {/* ✅ Modal éxito */}
      <Modal
        open={showSuccess}
        title="💖 PERFECTO!"
        message="Ésta canción me encantó desde el primer día (así como vos)"
        confirmText="Continuar"
        onConfirm={handleSuccess}
      />
    </main>
  );
}
