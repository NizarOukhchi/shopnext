import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ConvexClientProvider } from "@/components/ConvexProvider";
import { SelectedListProvider } from "@/components/SelectedListContext";
import { Providers } from "@/components/Providers";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-notoSans",
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
          <body className={`${notoSans.variable} antialiased`}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SelectedListProvider>{children}</SelectedListProvider>
            </ThemeProvider>
          </body>
        </Providers>
      </html>
    </ConvexClientProvider>
  );
}
