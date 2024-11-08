// components/RootLayout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/ui/header/Header";
import { AuthKitProvider } from '@workos-inc/authkit-nextjs';
import { ReactQueryProvider } from '@/components/react-query-provider';

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

export const metadata: Metadata = {
  title: "Contact Cards",
  description: "Share your contact information easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="animate-up-normal max-w-[430px]">
          <Header />
        </div>
        <AuthKitProvider>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </AuthKitProvider>
      </body>
    </html>
  );
}