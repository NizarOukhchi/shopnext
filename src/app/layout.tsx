import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ConvexClientProvider } from "@/components/ConvexProvider";
import { Providers } from "@/components/Providers";

const wotfard = localFont({
  src: [
    {
      path: "./fonts/wotfard-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/wotfard-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/wotfard-semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-wotfard",
});

export const metadata: Metadata = {
  title: "Shopnext: Save Products, Track Prices & Shop Smarter",
  description:
    "Shopnext is your smart shopping companion. Save products to buy later, track price drops, get personalized recommendations, and make smarter shopping decisions with AI-powered tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
      <html lang="en" suppressHydrationWarning>
        <Providers>
          <body className={`${wotfard.className} antialiased`}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </Providers>
      </html>
    </ConvexClientProvider>
  );
}
