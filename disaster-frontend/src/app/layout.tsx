import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "防災・減災アプリ",
  description: "災害情報の共有と確認ができるWebアプリケーション",
  manifest: "/manifest.json",
  themeColor: "#dc2626",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "防災アプリ"
  },
  formatDetection: {
    telephone: false
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5分間はデータを新鮮とみなす
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }))

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
