import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ODYSSEY — A Creative Expedition for Curious Minds",
  description:
    "ODYSSEY — Endless Possibilities. A creative expedition for curious minds, brought to you by μLearn CHN × IEDC Bootcamp CEC.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
