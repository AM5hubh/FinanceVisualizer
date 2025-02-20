'use client';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
// import { TransactionForm } from './TransactionForm';
import { format } from 'date-fns';
import { Edit2Icon, Trash2Icon } from 'lucide-react';

// Moved from types file for JSX version
const CATEGORY_LABELS = {
  housing: 'Housing',
  transportation: 'Transportation',
  food: 'Food',
  utilities: 'Utilities',
  healthcare: 'Healthcare',
  entertainment: 'Entertainment',
  shopping: 'Shopping',
  education: 'Education',
  savings: 'Savings',
  other: 'Other'
};

export function ListTransaction({ transactions, onDelete, onEdit }) {
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEdit = (transaction) => {
    onEdit(transaction);
    setEditingTransaction(null);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No transactions yet. Add one to get started!
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{format(transaction.date, 'PP')}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{CATEGORY_LABELS[transaction.category]}</TableCell>
                  <TableCell className="text-right">
                    ₹{transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right ">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingTransaction(transaction)}
                      >
                        <Edit2Icon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(transaction.id)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          {/* {editingTransaction && (
            <TransactionForm
              onSubmit={(data) => handleEdit({ ...data, id: editingTransaction.id })}
              initialData={editingTransaction}
            />
          )} */}
        </DialogContent>
      </Dialog>
    </>
  );
}