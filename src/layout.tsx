import React from "react";
import Header from "./components/header";
import ToastProvider from "./providers/toast-provider";
import AuthProvider from "./providers/auth-provider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthProvider>
        <Header />
        <ToastProvider />
        {children}
      </AuthProvider>
    </>
  );
}
