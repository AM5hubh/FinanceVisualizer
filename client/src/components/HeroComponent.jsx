"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChartBarIcon, LineChartIcon, PieChartIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function HeroSection() {
  const { user } = useAuth();
  return (
    <div className="relative isolate">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Take Control of Your Finances
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Track your expenses, visualize spending patterns, and make informed
            financial decisions with our intuitive personal finance tracker.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {user ? (
              <Link href="/financevisualizer">
                <Button size="lg" className="bg-blue-300 text-black font-bold animate-bounce ">Start Visualizing</Button>
              </Link>
            ) : (
              <Link href="/auth/signup">
                <Button size="lg">Get Started</Button>
              </Link>
            )}
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl bg-primary/5 p-4 mb-4">
                <ChartBarIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Expense Tracking</h3>
              <p className="mt-2 text-muted-foreground">
                Easily log and categorize your daily expenses with a
                user-friendly interface.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl bg-primary/5 p-4 mb-4">
                <LineChartIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Visual Analytics</h3>
              <p className="mt-2 text-muted-foreground">
                Understand your spending patterns through intuitive charts and
                graphs.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl bg-primary/5 p-4 mb-4">
                <PieChartIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Budget Management</h3>
              <p className="mt-2 text-muted-foreground">
                Set and track budgets to achieve your financial goals
                effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
