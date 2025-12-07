import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "200"],
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-mibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "200"],
});

export const metadata: Metadata = {
  title: "Poof.",
  description: "Chat. Vanish. Poof!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
