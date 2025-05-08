import { format } from 'date-fns';
import { searchTransactionSchema } from '@/lib/validators';
import { getTransactionsByMonth } from '@/server/getTransactionsByMonth';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Link from 'next/link';

const TransactionsPage = async ({
  searchParams
}: {
  searchParams: Promise<{ year?: string; month?: string }>
}) => {
  const searchParamsValues = await searchParams;

  const search = searchTransactionSchema.parse(searchParamsValues);

  const { month, year } = search;

  const selectedDate = new Date(year, month - 1, 1);

  const transactions = await getTransactionsByMonth({ month, year });
  console.log(transactions);

  return (
    <div className='max-w-screen-xl mx-auto p-10'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/dashboard'>
                Dashboard
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>
              Transactions
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className='mt-4'>
        <CardHeader>
          <CardTitle className='flex justify-between'>
            <p className='flex gap-2'>
              <span>{format(selectedDate, 'MMM yyyy')}</span>
              <span>Transactions</span>
            </p>
            <div>
              dropdowns
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Button asChild>
            <Link href='/dashboard/transactions/new'>
              New Transaction
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;