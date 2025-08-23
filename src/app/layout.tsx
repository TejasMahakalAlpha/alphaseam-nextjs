import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Alphaseam Enterprises',
  description: 'Professional IT Solutions',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}