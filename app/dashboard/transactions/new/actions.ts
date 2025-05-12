'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { transactionSchema } from '@/lib/validators';
import { transactionsTable } from '@/db/schema';

export async function createTransaction(data: {
  categoryId: number;
  amount: number;
  transactionDate: string;
  description: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    return {
      error: true,
      message: 'Unauthorized',
    };
  };

  const validation = transactionSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message
    };
  };

  const [transaction] = await db.insert(transactionsTable).values({
    userId,
    amount: data.amount.toString(),
    description: data.description,
    categoryId: data.categoryId,
    transactionDate: data.transactionDate,
  }).returning();

  return {
    id: transaction.id,
  };
};