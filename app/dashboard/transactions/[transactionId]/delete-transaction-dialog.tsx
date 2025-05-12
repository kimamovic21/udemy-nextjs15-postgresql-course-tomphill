'use client';

import { Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

const DeleteTransactionDialog = ({
  transactionId,
  transactionDate
}: {
  transactionId: number;
  transactionDate: string;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' size='icon'>
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this transaction ?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This transaction will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <Button variant='destructive'>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTransactionDialog;