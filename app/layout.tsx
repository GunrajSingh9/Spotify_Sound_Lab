import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spotify Sound Lab | Decode Your Music DNA",
  description: "Deep analysis of your Spotify listening patterns. Discover your music personality, track emotional trends, and visualize your unique sound identity.",
  keywords: ["Spotify", "music analysis", "music taste", "spotify stats", "music personality", "sound lab"],
  openGraph: {
    title: "Spotify Sound Lab",
    description: "Decode your unique music DNA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen text-white`}
      >
        {children}
      </body>
    </html>
  );
}