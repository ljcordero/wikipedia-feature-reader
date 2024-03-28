import { Providers } from "@/lib/providers";
import { PrimeReactProvider } from "primereact/api";
import type { Metadata } from "next";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "./globals.css";
import Root from "./root";

export const metadata: Metadata = {
  title: "Webapp",
  description: "Webapp for the wikipedia feature reader",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        </head>
        <body>
          <PrimeReactProvider>
            <Root>{children}</Root>
          </PrimeReactProvider>
        </body>
      </html>
    </Providers>
  );
}
