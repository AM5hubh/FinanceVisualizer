import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    education: {
      label: "Education",
      color: "rgb(255, 99, 132)",
    },
    transportation: {
      label: "Transportation",
      color: "rgb(54, 162, 235)", 
    },
    housing: {
      label: "Housing",
      color: "rgb(255, 206, 86)", 
    },
    food: {
      label: "Food",
      color: "rgb(75, 192, 192)", 
    },
    utilities: {
      label: "Utilities",
      color: "rgb(153, 102, 255)", 
    },
    healthcare: {
      label: "Healthcare",
      color: "rgb(255, 159, 64)",
    },
    entertainment: {
      label: "Entertainment",
      color: "rgb(255, 99, 255)", 
    },
    shopping: {
      label: "Shopping",
      color: "rgb(0, 204, 102)", 
    },
    savings: {
      label: "Savings",
      color: "rgb(102, 255, 255)", 
    },
    other: {
      label: "Other",
      color: "rgb(160, 160, 160)",
    },

  
};

const PieCategoryChart = ({ transactions = [] }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const categoryData = transactions.reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {});

    const formattedData = Object.keys(categoryData).map((category) => ({
      browser: category,
      amount: categoryData[category],
      fill: chartConfig[category]?.color || "hsl(var(--chart-7))", // Default color for uncategorized
      label: chartConfig[category]?.label || "Other", // Default label for uncategorized
    }));

    setChartData(formattedData);
  }, [transactions]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>Category-wise Distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[320px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie 
              data={chartData} 
              dataKey="amount" 
              label 
              nameKey="browser"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PieCategoryChart;