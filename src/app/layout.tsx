import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FM Logistic · Dashboard Monitoring",
  description: "Real-time application flow monitoring — Digital Studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}