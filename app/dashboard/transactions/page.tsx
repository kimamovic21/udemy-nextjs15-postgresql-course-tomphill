import { format } from 'date-fns';
import { PencilIcon } from 'lucide-react';
import { searchTransactionSchema } from '@/lib/validators';
import { getTransactionsByMonth } from '@/server/getTransactionsByMonth';
import { getTransactionYearsRange } from '@/server/getTransactionYearsRange';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Link from 'next/link';
import numeral from 'numeral';
import Filters from './filters';

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

  const yearsRange = await getTransactionYearsRange();

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
              <Filters 
                year={year} 
                month={month}
                yearsRange={yearsRange}
              />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Button asChild>
            <Link href='/dashboard/transactions/new'>
              New Transaction
            </Link>
          </Button>

          {!transactions?.length && (
            <p className='text-center py-10 text-lg text-muted-foreground'>
              There are no transactions for this month
            </p>
          )}

          {!!transactions?.length && (
            <Table className='mt-4'>
              <TableCaption>A list of your transactions.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className='text-right'>Edit</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {transactions?.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {format(new Date(transaction.transactionDate), "do MMM yyyy")}
                    </TableCell>
                    <TableCell>
                      {transaction.description}
                    </TableCell>
                    <TableCell className='capitalize'>
                      <Badge
                        className={
                          transaction.transactionType === 'income'
                            ? 'bg-lime-500'
                            : 'bg-orange-600'
                        }
                      >
                        {transaction.transactionType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {transaction.category}
                    </TableCell>
                    <TableCell>
                      ${numeral(transaction.amount).format('0,0[.]00')}
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button variant='outline' asChild size='icon' aria-label='Edit transaction'>
                        <Link href={`/dashboard/transactions/${transaction.id}`}>
                          <PencilIcon />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;