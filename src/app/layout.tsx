import type { Metadata } from "next";
import "./globals.css";
import Snowfall from "@/components/effects/Snowfall";

export const metadata: Metadata = {
  title: "Global Gift Exchange - Share Joy Worldwide",
  description: "Share joy globally this Christmas. Send and receive gifts worldwide with flexible cash or crypto redemption.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎁</text></svg>"
        />
      </head>
      <body>
        <Snowfall />
        {children}
      </body>
    </html>
  );
}
