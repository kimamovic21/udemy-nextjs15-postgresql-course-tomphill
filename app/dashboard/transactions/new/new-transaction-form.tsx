'use client';

import { z } from 'zod';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { transactionFormSchema } from '@/lib/validators';
import { createTransaction } from './actions';
import { type Category } from '@/types/Category';
import TransactionForm from '@/components/transactions/transaction-form';

const NewTransactionForm = ({
  categories
}: {
  categories: Category[]
}) => {
  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await createTransaction({
      categoryId: data.categoryId,
      amount: data.amount,
      transactionDate: format(data.transactionDate, 'yyyy-MM-dd'),
      description: data.description,
    });

    if (result.error) {
      toast('Error', {
        description: result.message,
      });
    };

    console.log(result.id);
  };

  return (
    <TransactionForm
      categories={categories}
      onSubmit={handleSubmit}
    />
  );
};

export default NewTransactionForm;