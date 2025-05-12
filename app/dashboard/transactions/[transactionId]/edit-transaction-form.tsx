'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { transactionFormSchema } from '@/lib/validators';
import { type Category } from '@/types/Category';
import { type Transaction } from '@/types/Transaction';
import { updateTransaction } from './actions';
import TransactionForm from '@/components/transactions/transaction-form';

const EditTransactionForm = ({
  categories,
  transaction
}: {
  categories: Category[];
  transaction: Transaction;
}) => {
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await updateTransaction({
      id: transaction.id,
      amount: data.amount,
      description: data.description,
      categoryId: data.categoryId,
      transactionDate: format(data.transactionDate, 'yyyy-MM-dd'),
    });

    if (result?.error) {
      toast.error(result.message);
      return;
    };

    toast.success('Transaction updated');

    router.push(`/dashboard/transactions?month=${data.transactionDate.getMonth() + 1}&year=${data.transactionDate.getFullYear()}`);
  };

  return (
    <TransactionForm
      categories={categories}
      onSubmit={handleSubmit}
      defaultValues={{
        amount: Number(transaction.amount),
        categoryId: transaction.categoryId,
        description: transaction.description,
        transactionDate: new Date(transaction.transactionDate),
        transactionType:
          categories.find(
            (category) => category.id === transaction.categoryId
          )?.type ?? 'income'
      }}
    />
  );
};

export default EditTransactionForm;