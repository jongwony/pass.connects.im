import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const title = "Pass Connect (패스 커넥트)"
const description = "토스, 카카오, 링크드인, 인스타그램 등 다양한 정보를 QR로 만들어 Apple 지갑으로 연결하세요."
export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s",
  },
  description: description,
  alternates: {
    canonical: "https://pass.connects.im",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://pass.connects.im",
    title: title,
    siteName: title,
    description: description,
    images: [
      {
        url: "https://pass.connects.im/og_toss.png",
        width: 1200,
        height: 630,
        alt: "Pass Connect 토스 송금하기",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: ["https://pass.connects.im/og_toss.png"],
  },
  keywords: [
    "Pass Connect",
    "패스 커넥트",
    "QR 코드",
    "QR Code",
    "Apple Wallet",
    "애플 월렛",
    "애플 지갑",
    "QR 송금하기",
    "QR 프로필",
    "프로필 링크 공유",
    "송금 코드 공유",
    "토스 송금하기",
    "카카오 송금하기",
    "링크드인 QR",
    "인스타그램 QR",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* 구조화된 데이터 추가 예시 */}
        <script type="application/ld+json" suppressHydrationWarning>
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://pass.connects.im",
            "name": "${title}",
            "description": "${description}"
          }
          `}
        </script>
        {/* 필요시 robots 메타 태그 추가 */}
        <meta name="robots" content="index,follow" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
