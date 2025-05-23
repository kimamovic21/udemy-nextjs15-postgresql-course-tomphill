'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { transactionFormSchema } from '@/lib/validators';
import { defaultValues } from '@/lib/constants';
import { type Category } from '@/types/Category';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '../ui/input';

type TransactionFormProps = {
  categories: Category[];
  onSubmit: (data: z.infer<typeof transactionFormSchema>) => Promise<void>;
  defaultValues?: typeof defaultValues
};

const TransactionForm = ({
  categories,
  onSubmit,
  defaultValues
}: TransactionFormProps) => {
  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: 0,
      categoryId: 0,
      description: '',
      transactionDate: new Date(),
      transactionType: 'income',
      ...defaultValues
    },
  });

  const transactionType = form.watch('transactionType');

  const filteredCategories = categories?.filter(
    (category) => category.type === transactionType
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          disabled={form.formState.isSubmitting}
          className='grid grid-cols-2 gap-y-5 gap-x-2 items-start'
        >
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
                      onValueChange={(newValue) => {
                        field.onChange(newValue);
                        form.setValue('categoryId', 0);
                      }}
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
                  <FormMessage />
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
                        {filteredCategories?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name='transactionDate'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>
                    Transaction Date
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={{
                            after: new Date(),
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>
                    Amount
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </fieldset>

        <fieldset
          disabled={form.formState.isSubmitting}
          className='mt-5 flex flex-col gap-5'
        >
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <Button type='submit'>
            Submit
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default TransactionForm;