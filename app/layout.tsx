import type { Metadata } from "next";
import "./globals.css";
import "./styles.css";

export const metadata: Metadata = {
  title: "Abraão Santos | Desenvolvedor Back-End",
  description: "Portfólio de Abraão Santos - Desenvolvedor Back-End com conhecimentos em front-end e back-end, com foco no desenvolvimento back-end.",
  keywords: ["Desenvolvedor", "Back-End", "Front-End", "JavaScript", "React", "Next.js", "Python", "Flask", "PostgreSQL"],
  authors: [{ name: "Abraão Santos" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "Abraão Santos | Desenvolvedor Back-End",
    description: "Portfólio de Abraão Santos - Desenvolvedor Back-End com foco no desenvolvimento back-end",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
