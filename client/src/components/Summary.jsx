import React from 'react';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

const CATEGORY_LABELS = {
  housing: "Housing",
  food: "Food",
  transportation: "Transportation",
  utilities: "Utilities",
  healthcare: "Healthcare",
  education: "Education"
};

const DashboardSummary = ({ transactions }) => {
  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);

  const categoryTotals = transactions.reduce((acc, transaction) => {
    const category = transaction.category;
    acc[category] = (acc[category] || 0) + transaction.amount;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([category, amount]) => ({
      category: CATEGORY_LABELS[category],
      amount,
    }));

  const recentTransactions = [...transactions]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 3);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Total Expenses</h3>
        <p className="mt-2 text-3xl font-bold">₹{totalExpenses.toFixed(2)}</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Top Categories</h3>
        <div className="mt-2 space-y-2">
          {topCategories.map(({ category, amount }) => (
            <div key={category} className="flex justify-between items-center">
              <span className="text-sm">{category}</span>
              <span className="text-sm font-medium">₹{amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-6 md:col-span-2">
        <h3 className="text-sm font-medium text-muted-foreground">Recent Transactions</h3>
        <div className="mt-2 space-y-2">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center border-b py-2 last:border-0"
            >
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">
                  {CATEGORY_LABELS[transaction.category]} •{' '}
                  {formatDistanceToNow(transaction.date, { addSuffix: true })}
                </p>
              </div>
              <span className="font-medium">₹{transaction.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardSummary;