import type { Metadata } from "next";
import "./globals.css";
import StarsBackground from "@/components/stars/starsBackground";
import ClientLayout from "@/components/ClientLayout/ClientLayout";


export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
      <div className='wrapper'>
          <StarsBackground/>
          <ClientLayout>
              {children}
          </ClientLayout>
      </div>
      </body>
    </html>
  );
}
