"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import {Nav} from "../components/Nav";
import {Main} from "../components/ui/Main";
import {Content} from "../components/ui/Content";
import {Separator} from "../components/ui/separator";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Main>
          <Nav />
          <Separator />
          <Content>
            {children}
          </Content>
        </Main>
      </body>
    </html>
  );
}
