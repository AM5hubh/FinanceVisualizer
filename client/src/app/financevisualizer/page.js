"use client";
import { TransactionForm } from "@/components/addTransaction";
import { ListTransaction } from "@/components/ListTransaction";
import { ReceiptIndianRupee, ArrowLeft, Home } from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BarTransactionData from "@/components/BarTransactionData";
import PieCategoryChart from "@/components/PieCategoryChart";
import DashboardSummary from "@/components/Summary";
import { useAuth } from "@/context/AuthContext";

export default function page() {
  const [transactions, setTransactions] = useState([]);
  const { transactionsauth } = useAuth();
  const addTransaction = (transaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      { ...transaction, id: crypto.randomUUID() },
    ]);
  };
  useEffect(() => {
    console.log("Updated Transactions:", transactions);
  }, [transactions]);
  

  console.log(transactions)
  const deleteTransaction = (id) => {
    setTransactions(transactionsauth.filter((t) => t.id !== id));
  };

  const editTransaction = (updatedTransaction) => {
    setTransactions(
      transactionsauth.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      )
    );
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Link href="/" className="hidden md:block absolute ml-4 mt-3">
          <Home className="size-6 hover:scale-125 transition-transform duration-300" />
        </Link>
        <h1 className="text-3xl md:text-4xl m-5 mb-12 font-bold flex justify-center">
          <span>
            <ReceiptIndianRupee className="size-10" />
          </span>
          Finance Visualizer
        </h1>
      </div>
      <div className="border p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h2 className="text-2xl mb-3 font-semibold">Summary</h2>
        <DashboardSummary transactions={transactionsauth} />
      </div>
      <div className="flex md:flex-row flex-col justify-center gap-5 mb-5">
        <div className="md:w-1/2 border p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl mb-3 font-semibold">Add Transaction</h2>
          <TransactionForm onSubmit={addTransaction} />
        </div>
        <div className="md:w-1/2 border p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl mb-3 font-semibold">Transactions</h2>
          <ListTransaction
            transactions={transactionsauth}
            onDelete={deleteTransaction}
            onEdit={editTransaction}
          />
        </div>
      </div>

      <div className="flex md:flex-row flex-col justify-center gap-5 mb-5">
        <div className="md:w-1/2 border p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          {/* <h2 className="text-2xl mb-3 font-semibold">Transaction </h2> */}
          <BarTransactionData transactions={transactionsauth} />
        </div>
        <div className="md:w-1/2 border p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          {/* <h2 className="text-2xl mb-3 font-semibold">Transaction </h2> */}
          <PieCategoryChart transactions={transactionsauth} />
        </div>
      </div>
    </div>
  );
}
