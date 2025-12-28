import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La sorpresa 💖",
  description: "Un viaje por descifrar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <div
          className="min-h-screen bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('/fondo.jpg')" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Contenido */}
          <div className="relative z-10 w-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
