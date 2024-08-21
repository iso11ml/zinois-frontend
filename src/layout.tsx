import React from "react";
import Header from "./components/header";
import ToastProvider from "./providers/toast-provider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
