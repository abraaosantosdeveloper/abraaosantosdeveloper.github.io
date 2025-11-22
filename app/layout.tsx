import type { Metadata } from "next";
import "./globals.css";
import "./styles.css";

export const metadata: Metadata = {
  title: "Abraão Santos | Desenvolvedor Full Stack",
  description: "Portfólio de Abraão Santos - Desenvolvedor Full Stack com experiência em criar soluções web modernas e responsivas.",
  keywords: ["Desenvolvedor", "Full Stack", "JavaScript", "React", "Next.js", "Python", "Flask", "PostgreSQL"],
  authors: [{ name: "Abraão Santos" }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Abraão Santos | Desenvolvedor Full Stack",
    description: "Portfólio de Abraão Santos - Desenvolvedor Full Stack",
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
