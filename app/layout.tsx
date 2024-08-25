import type { Metadata, Viewport } from "next";
import "./globals.css";
import MySnackProvider from "@/app/components/MySnackProvider";
import { inter, nato } from "@/utils/constants";

export const metadata: Metadata = {
  title: "GoogleHotelAds",
  description: "Google hotel promoting Ads",
  manifest: "/manifest.json",
  icons: [
    { rel: "apple-touch-icon", url: "img/img/icons/logo.png" },
    { rel: "icon", url: "img/icons/logo.png" },
  ],
};


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <body className={`${inter.variable} ${nato.variable} bg-main-gray`}>
        <MySnackProvider
        >{children}
        </MySnackProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}

