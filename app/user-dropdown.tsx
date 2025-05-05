'use client';

import { useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { ChartColumnBigIcon } from 'lucide-react';

const UserDropdown = () => {
  const router = useRouter();

  return (
    <UserButton
      showName
      appearance={{
        elements: {
          userButtonOuterIdentifier: {
            color: 'white'
          }
        }
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Action 
          label='Dashboard' 
          labelIcon={<ChartColumnBigIcon size={16} />} 
          onClick={() => {
            router.push('/dashboard')
          }}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserDropdown;