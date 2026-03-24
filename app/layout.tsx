import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TilesBackground } from "../components/TilesBackground";
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
  title: "WLU WebRing",
  description:
    "A ring of Laurier student portfolios. Discover projects, meet builders.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "WLU WebRing",
    description:
      "A ring of Laurier student portfolios. Discover projects, meet builders.",
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
      <head>
        {/* Explicit favicon link to override any default Vercel icon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen antialiased`}
      >
        <TilesBackground />
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
