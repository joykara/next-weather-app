import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
    subsets: ['latin'],
    weight: '700'
})

export const metadata: Metadata = {
  title: "Weather App",
  description: "A simple next weather app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
