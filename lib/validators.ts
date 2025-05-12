import { z } from 'zod';
import { addDays, subYears } from 'date-fns';

export const transactionFormSchema = z.object({
  transactionType: z
    .enum(['income', 'expense']),
  categoryId: z
    .coerce
    .number()
    .positive('Please select a category'),
  transactionDate: z
    .coerce
    .date()
    .min(subYears(new Date(), 10), 'Transaction date cannot be older more than 10 years')
    .max(addDays(new Date(), 1), 'Transaction date cannot be in the future'),
  amount: z
    .coerce
    .number()
    .positive('Amount must be greater than 0'),
  description: z
    .string()
    .min(3, 'Description must contain at least 3 characters')
    .max(300, 'Description must contain a maximum of 300 characters'),
});

export const transactionSchema = z.object({
  amount: z
    .number()
    .positive('Amount must be greater than 0'),
  description: z
    .string()
    .min(3, 'Description must contain at least 3 characters')
    .max(300, 'Description must contain a maximum of 300 characters'),
  categoryId: z
    .coerce
    .number()
    .positive('Category ID is invalid'),
  transactionDate: z
    .coerce
    .date()
    .min(subYears(new Date(), 10), 'Transaction date cannot be older more than 10 years')
    .max(addDays(new Date(), 1), 'Transaction date cannot be in the future'),
});

export const searchTransactionSchema = z.object({
  year: z
    .coerce
    .number()
    .min(new Date().getFullYear() - 10)
    .max(new Date().getFullYear() + 1)
    .catch(new Date().getFullYear()),
  month: z
    .coerce
    .number()
    .min(1)
    .max(12)
    .catch(new Date().getMonth() + 1),
});

export const updateTransactionSchema = transactionSchema.and(
  z.object({
    id: z.number(),
  }),
);