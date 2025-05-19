import { ReactNode } from 'react';
import { ThemeProvider } from '@/context/theme-provider';
import { AuthProvider } from '@/context/auth-context';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

interface RootLayoutProps {
  children: ReactNode;
}

// Dashboard layout component
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider defaultTheme="system">
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <QueryClientProvider client={queryClient}>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </QueryClientProvider>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
