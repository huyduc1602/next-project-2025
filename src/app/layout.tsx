import { ReactNode } from "react";
import { ThemeProvider } from "@/context/theme-provider";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import ReactQueryProvider from "@/components/providers/react-query-provider";

// Use the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Modern Next.js App with React 19",
  description: "A modern application built with Next.js and React 19",
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider defaultTheme="system">
          <div className="relative flex min-h-screen flex-col">
            <ReactQueryProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </ReactQueryProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
