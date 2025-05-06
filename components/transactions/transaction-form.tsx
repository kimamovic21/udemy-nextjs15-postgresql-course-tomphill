'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { transactionFormSchema } from '@/lib/validators';
import { defaultValues } from '@/lib/constants';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';

const TransactionForm = () => {
  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = async (
    data: z.infer<typeof transactionFormSchema>
  ) => {

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset className='grid grid-cols-2 gap-y-5 gap-x-2'>
          <FormField
            control={form.control}
            name='transactionType'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>
                    Transaction Type
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='income'>
                          Income
                        </SelectItem>
                        <SelectItem value='expense'>
                          Expense
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )
            }}
          />
          
          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>
                    Category
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )
            }}
          />
        </fieldset>
      </form>
    </Form>
  );
};

export default TransactionForm;