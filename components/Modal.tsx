"use client";

type ModalProps = {
  open: boolean;
  title?: string;
  message: string;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
};

export default function Modal({
  open,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "Cerrar",
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center z-10">
        {title && (
          <h2 className="text-black text-xl font-bold mb-4">{title}</h2>
        )}

        <p className="text-gray-700 mb-6">{message}</p>

        <button
          onClick={onConfirm || onClose}
          className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition w-full"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}
