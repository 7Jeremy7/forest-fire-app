import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { NotificationProvider}  from "@/context/NotificationContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({subsets: ['latin']})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AWAIF",
  description: "Autenticación",
};

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
    <body className={`${inter.className} ${geistSans.variable} ${geistMono.variable}`}>
      <NotificationProvider>
      <main className="min-h-screen flex flex-col items-center justify-center">
        {children}
        </main>
      </NotificationProvider>
    </body>
  </html>
  );
}
