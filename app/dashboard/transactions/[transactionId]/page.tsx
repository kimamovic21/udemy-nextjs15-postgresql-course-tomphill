import { notFound } from 'next/navigation';
import { getCategories } from '@/server/getCategories';
import { getTransaction } from '@/server/getTransaction';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import EditTransactionForm from './edit-transaction-form';
import DeleteTransactionDialog from './delete-transaction-dialog';

const EditTransactionPage = async ({
  params
}: {
  params: Promise<{ transactionId: string }>
}) => {
  const paramsValue = await params;
  const transactionId = Number(paramsValue.transactionId);

  if (isNaN(transactionId)) {
    notFound();
  };

  const categories = await getCategories();
  const transaction = await getTransaction(transactionId);

  if (!transaction) {
    notFound();
  };

  return (
    <Card className='mt-4 max-w-screen-md'>
      <CardHeader>
        <CardTitle className='flex justify-between'>
          <span>Edit Transaction</span>
          <DeleteTransactionDialog
            transactionId={transaction.id}
            transactionDate={transaction.transactionDate}
          />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <EditTransactionForm
          categories={categories}
          transaction={transaction}
        />
      </CardContent>
    </Card>
  );
};

export default EditTransactionPage;