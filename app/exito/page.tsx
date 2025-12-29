"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Exito() {
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = "/Sorpresa.png";
    link.download = "Sorpresa.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    // 🎉 CONFETI
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* 🎥 VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover animate-fadeIn"
      >
        <source src="/exito-bg.mp4" type="video/mp4" />
      </video>

      {/* 🌫️ OVERLAY */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* 💖 CONTENIDO */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-6 text-center">
        <div className="max-w-md backdrop-blur-md bg-black/40 rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold mb-4">
            🎉 FELICITACIONES
          </h1>

          <p className="text-lg mb-6">
            ACABAS DE DESCIFRAR EL ENIGMA DE LA SORPRESA ✨
          </p>

          <button
            onClick={downloadImage}
            className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition"
          >
            Descargar sorpresa 💖
          </button>
        </div>
      </div>
    </main>
  );
}
