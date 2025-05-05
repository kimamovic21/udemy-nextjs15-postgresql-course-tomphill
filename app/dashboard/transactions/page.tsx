import Link from 'next/link';

const TransactionsPage = () => {
  return (
    <div className='flex gap-1'>
      <Link href='/dashboard/'>
        Dashboard
      </Link>
      <Link href='/dashboard/transactions/new'>
        New Transaction
      </Link>
    </div>
  );
};

export default TransactionsPage;