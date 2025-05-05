'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { transactionFormSchema } from '@/lib/validators';
import { defaultValues } from '@/lib/constants';

const TransactionForm = () => {
  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: defaultValues,
  });
  
  return (
    <div>Transaction Form</div>
  );
};

export default TransactionForm;