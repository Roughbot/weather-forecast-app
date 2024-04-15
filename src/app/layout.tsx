"use client";
import "./globals.css";
import Nav from "@/components/Nav";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body>
          <Provider store={store}>
            <Nav />
            {children}
          </Provider>
        </body>
      </html>
    </>
  );
}
