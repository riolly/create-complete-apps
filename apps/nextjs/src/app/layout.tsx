import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "~/styles/globals.css";

import { headers } from "next/headers";

import { TRPCReactProvider } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const title = "Create Complete Apps";
const description =
  "Create dynamic web app, content-based website, mobile app, with API and database in a single monorepo.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://cca.riolly.dev",
    siteName: title,
  },
  twitter: {
    card: "summary_large_image",
    site: "@bertoriolly",
    creator: "@bertoriolly",
  },
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={["font-sans", fontSans.variable].join(" ")}>
          <TRPCReactProvider headers={headers()}>
            {props.children}
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
