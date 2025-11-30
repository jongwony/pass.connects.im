import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import Footer from "./Footer";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = messages.metadata;

  const title = t.title;
  const description = t.description;

  return {
    title: {
      default: title,
      template: "%s",
    },
    description: description,
    alternates: {
      canonical: `https://pass.connects.im/${locale}`,
      languages: {
        'ko': 'https://pass.connects.im/ko',
        'en': 'https://pass.connects.im/en',
      },
    },
    openGraph: {
      type: "website",
      locale: locale === 'ko' ? "ko_KR" : "en_US",
      url: `https://pass.connects.im/${locale}`,
      title: title,
      siteName: title,
      description: description,
      images: [
        {
          url: "https://pass.connects.im/og_toss.png",
          width: 1200,
          height: 630,
          alt: t.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["https://pass.connects.im/og_toss.png"],
    },
    keywords: locale === 'ko' ? [
      "Pass Connect",
      "패스 커넥트",
      "qr코드 만들기",
      "Apple Wallet",
      "애플 월렛",
      "애플 지갑",
      "QR 송금하기",
      "프로필링크 만들기",
      "송금 qr코드 만들기",
      "토스 송금하기",
      "토스 qr코드",
      "카카오 송금하기",
      "카카오페이 qr코드",
      "링크드인 qr코드",
      "링크드인 프로필 qr",
      "인스타그램 qr코드",
      "인스타 프로필 qr",
    ] : [
      "Pass Connect",
      "QR code generator",
      "Apple Wallet",
      "QR payment",
      "profile link",
      "Toss payment",
      "KakaoPay QR",
      "LinkedIn QR code",
      "Instagram QR code",
    ],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  // Validate that the incoming locale is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" hrefLang="ko" href="https://pass.connects.im/ko" />
        <link rel="alternate" hrefLang="en" href="https://pass.connects.im/en" />
        <link rel="alternate" hrefLang="x-default" href="https://pass.connects.im/ko" />
        <script type="application/ld+json" suppressHydrationWarning>
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://pass.connects.im",
            "name": "${messages.metadata && typeof messages.metadata === 'object' && 'title' in messages.metadata ? messages.metadata.title : 'Pass Connect'}",
            "description": "${messages.metadata && typeof messages.metadata === 'object' && 'description' in messages.metadata ? messages.metadata.description : ''}"
          }
          `}
        </script>
        <meta name="robots" content="index,follow" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
