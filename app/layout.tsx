import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ChartColumnBigIcon } from 'lucide-react';
import {
  ClerkProvider,
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
} from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import UserDropdown from './user-dropdown';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NextCash App',
  description: 'Track your finances with ease',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${poppins.variable} antialiased`}>
          <nav className='bg-primary p-4 text-white h-20 flex items-center justify-between'>
            <Link
              href='/'
              className='font-bold text-2xl flex items-center gap-1'
            >
              <ChartColumnBigIcon className='text-lime-500' />
              <span>NextCash</span>
            </Link>

            <div>
              <SignedOut>
                <div className='flex items-center'>
                  <Button asChild variant='link' className='text-white'>
                    <SignInButton />
                  </Button>
                  <Button asChild variant='link' className='text-white'>
                    <SignUpButton />
                  </Button>
                </div>
              </SignedOut>

              <SignedIn>
                <UserDropdown />
              </SignedIn>
            </div>
          </nav>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};
