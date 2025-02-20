'use client';
import { TransactionForm } from "@/components/addTransaction";
import { ListTransaction } from "@/components/ListTransaction";
import { ReceiptIndianRupee } from "lucide-react";
import React, { useState,useEffect } from "react";

export default function page() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      { ...transaction, id: crypto.randomUUID() },
    ]);
  };
  useEffect(() => {
    console.log("Updated Transactions:", transactions);
  }, [transactions]);
  
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const editTransaction = (updatedTransaction) => {
    setTransactions(
      transactions.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl md:text-4xl m-5 mb-12 font-bold flex justify-center">
        <span>
          <ReceiptIndianRupee className="size-10" />
        </span>
        Finance Visualizer
      </h1>
      <div className="flex md:flex-row flex-col justify-center gap-5">

      <div className="md:w-1/2 border p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h2 className="text-2xl mb-3 font-semibold">Add Transaction</h2>
        <TransactionForm onSubmit={addTransaction} />
      </div>
      <div className="md:w-1/2 border p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h2 className="text-2xl mb-3 font-semibold">Add Transaction</h2>
        <ListTransaction transactions={transactions}
            onDelete={deleteTransaction}
            onEdit={editTransaction}/>
      </div>
      </div>
    </div>
  );
}
