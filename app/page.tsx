import { ChartColumnBig } from 'lucide-react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton
} from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  return (
    <main className='min-h-screen h-[calc(100vh - 80px)] flex items-center justify-center bg-white relative'>
      <Image
        src='/cover.jpg'
        alt='Cover image'
        fill
        className='object-center opacity-50'
      />

      <div className='relative z-10 text-center flex flex-col gap-4'>
        <h1 className='text-5xl font-bold flex gap-1 items-center justify-center'>
          <span>
            <ChartColumnBig className='text-lime-500' size={60} />
          </span>
          <span>NextCash</span>
        </h1>

        <p className='text-2xl'>
          Track your finances with ease
        </p>

        <SignedIn>
          <Button asChild size='lg'>
            <Link href='/dashboard'>
              Go to your dashboard
            </Link>
          </Button>
        </SignedIn>

        <SignedOut>
          <div className='flex gap-2 items-center justify-center'>
            <Button
              asChild
              size='lg'
              className='bg-lime-600 hover:bg-lime-500'
            >
              <SignInButton />
            </Button>

            <Button
              asChild
              size='lg'
            >
              <SignOutButton />
            </Button>
          </div>
        </SignedOut>
      </div>
    </main>
  );
};

export default HomePage;