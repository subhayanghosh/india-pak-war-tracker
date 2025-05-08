import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "India-Pakistan Conflict Tracker",
  description: "Real-time tracking of the India-Pakistan conflict with news updates from reliable sources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">
                    India-Pakistan Conflict Tracker
                  </h1>
                </div>
              </div>
              <div className="flex items-center">
                <a
                  href="https://github.com/yourusername/india-pak-war-tracker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700"
                >
                  GitHub
                </a>
              </div>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
