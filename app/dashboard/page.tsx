import Link from 'next/link';

const DashboardPage = () => {
  return (
    <div className='flex gap-1'>
      <Link href='/dashboard/transactions'>
        Transactions
      </Link>
      <Link href='/dashboard/transactions/new'>
        New Transaction
      </Link>
    </div>
  );
};

export default DashboardPage;