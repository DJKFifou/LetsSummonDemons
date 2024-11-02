import type { Metadata } from 'next';
import '../dist/globals.css';

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
    <html lang="en" className="max-w-screen overflow-x-hidden">
      <body className="bg-white text-black">{children}</body>
    </html>
  );
}
