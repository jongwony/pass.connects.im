import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pass Connect",
  description: "Create QR codes for Apple Wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
