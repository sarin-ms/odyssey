import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ODYSSEY | IEDC BOOTCAMP CEC X μLearn CHN",
  description:
    "ODYSSEY — Endless Possibilities. A creative expedition for curious minds, brought to you by IEDC Bootcamp CEC × xμLearn CHN.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,500;0,600;0,700;1,400&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
