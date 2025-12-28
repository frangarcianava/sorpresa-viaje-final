"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGuard } from "@/hooks/useGuard";
import { setProgress } from "@/lib/progress";
import Modal from "@/components/Modal";

const CORRECT_CODE = "28032026"; // ← REEMPLAZÁ por el código real (8 dígitos)

export default function Prueba4() {
  useGuard(4);

  const router = useRouter();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const [code, setCode] = useState<string[]>(Array(8).fill(""));
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 7) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const checkCode = () => {
    const enteredCode = code.join("");

    if (enteredCode.length < 8) {
      setShowError(true);
      return;
    }

    if (enteredCode === CORRECT_CODE) {
      setShowSuccess(true);
    } else {
      setShowError(true);
    }
  };

  const handleSuccess = () => {
    setShowSuccess(false);
    setProgress(5);
    router.push("/exito");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full backdrop-blur rounded-2xl p-8 shadow-xl text-center">
        <h1 className="text-2xl font-bold mb-4">🔐 Prueba Final</h1>

        <p className="text-sm text-gray-200 mb-6 leading-relaxed text-left">
          Primeros dos números: Son los últimos dos números de lo que anhelábamos
          ganar hace unos días atrás (más precisamente el día 22 de diciembre).
          <br /><br />
          Los dos números siguientes: Indican la cantidad de amigos con los que
          fuiste al Interrail donde nos conocimos.
          <br /><br />
          Los dos números siguientes a esos (el 5 y el 6): Corresponden a la fecha
          del cumpleaños de la persona más buena y bonita de la tierra.
          <br /><br />
          Y los últimos dos números es tu edad actual.
          <br /><br />
          <strong>¿Ya lo sacaste?</strong>
        </p>

        {/* 🔢 INPUTS DEL CÓDIGO */}
        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputsRef.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 text-center text-xl font-bold rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          ))}
        </div>

        <button
          onClick={checkCode}
          className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition w-full"
        >
          Comprobar código
        </button>
      </div>

      {/* ❌ Error */}
      <Modal
        open={showError}
        message="Mmm... ese no es el código correcto. Pensá un poquito más 💭"
        onClose={() => setShowError(false)}
      />

      {/* ✅ Éxito */}
      <Modal
        open={showSuccess}
        title="💖 LO LOGRASTE"
        message="Sabía que lo ibas a descifrar. Felicidades!! ✨"
        confirmText="Ver sorpresa"
        onConfirm={handleSuccess}
      />
    </main>
  );
}
