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
  title: "WLU WebRing",
  description:
    "A ring of Laurier student portfolios. Discover projects, meet builders.",
  icons: {
    // Add a version query to bust stubborn favicon caches
    icon: "/ca_wlfu2.png?v=2",
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
        <link rel="icon" href="/ca_wlfu2.png?v=2" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
