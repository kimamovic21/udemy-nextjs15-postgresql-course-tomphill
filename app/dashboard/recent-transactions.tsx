import { format } from 'date-fns';
import { getRecentTransactions } from '@/server/getRecentTransactions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import numeral from 'numeral';
import Link from 'next/link';

const RecentTransactions = async () => {
  const transactions = await getRecentTransactions();

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex justify-between'>
          <span>Recent Transactions</span>
          <div className='flex gap-2'>
            <Button asChild variant='outline'>
              <Link href='/dashboard/transactions'>
                View All
              </Link>
            </Button>
            <Button asChild>
              <Link href='/dashboard/transactions/new'>
                Create New
              </Link>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!transactions?.length && (
          <p className='text-center py-10 text-lg text-muted-foreground'>
            There are no transactions for this month.
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;