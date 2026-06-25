import type { Metadata } from "next";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "Festow — Send Gifts Across Borders",
  description: "A premium cross-border gifting platform. Send gifts to 120+ countries. Recipients choose: accept the item, take the cash, or take crypto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
