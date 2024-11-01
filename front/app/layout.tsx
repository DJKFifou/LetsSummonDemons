import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../dist/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Let's Summon Demons",
  description:
    "Plongez dans l'univers rétro de Let's Summon Demons, un jeu de cartes en ligne où vous incarnez un invocateur de démons.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
