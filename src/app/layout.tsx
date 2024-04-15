"use client";
import "./globals.css";
import Nav from "@/components/Nav";
import { store } from "@/store/store";
import Head from "next/head";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <title>Weather Forecast</title>
        <meta
          name="description"
          content="Weather Forecast application to fetch weather data from all the cities around the world."
        />
      </Head>
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
