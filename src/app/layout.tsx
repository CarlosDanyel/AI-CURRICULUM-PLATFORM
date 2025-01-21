import type { Metadata } from 'next';
import { Nunito_Sans, DM_Sans } from 'next/font/google';
import '../styles/globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const fontSans = Nunito_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
});

const fontTitle = DM_Sans({
  variable: '--font-title',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Viza',
  description: 'Crie o seu curriculo',
};

setDefaultOptions({ locale: ptBR });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontTitle.variable,
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
