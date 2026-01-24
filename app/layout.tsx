import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WOW Lifestyle",
  description: "Premium lifestyle and collectibles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.className} scroll-smooth`}>
        {children}
      </body>
    </html>
  );
}