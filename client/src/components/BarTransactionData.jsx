"use client";

import React, { useState, useEffect, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { format, startOfMonth, endOfMonth, eachMonthOfInterval } from "date-fns";

const BarTransactionData = ({ transactions = [] }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 5);

    const months = eachMonthOfInterval({
      start: startOfMonth(sixMonthsAgo),
      end: endOfMonth(today),
    });

    const formattedData = months.map((month) => {
      const monthlyTransactions = transactions.filter(
        (t) => new Date(t.date) >= startOfMonth(month) && new Date(t.date) <= endOfMonth(month)
      );

      const total = monthlyTransactions.reduce((sum, t) => sum + t.amount, 0);

      return {
        month: format(month, "MMM yyyy"),
        total,
      };
    });

    setChartData(formattedData);
  }, [transactions]); // Only runs when `transactions` change

  return (
    <div className="p-6 shadow-lg rounded-lg">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Bar Chart</h2>
        {/* <p className="text-gray-300">January - June 2024</p> */}
      </div>
      {chartData.length > 0 ? (
        <div className="overflow-x-auto">
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Bar dataKey="total" fill="#4F46E5" radius={8} />
          </BarChart>
        </div>
      ) : (
        <p className="text-gray-500">Loading chart data...</p>
      )}
      
    </div>
  );
};

export default BarTransactionData;
