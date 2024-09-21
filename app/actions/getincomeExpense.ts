"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  const { userId } = auth();
  if (!userId) {
    return { error: "user not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    });
    const amounts = transactions.map((transaction) => transaction.amount);

    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => acc + item, 0); //filter is getting all positive values, reduce is adding them up to get total

    const expense = amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => acc + item, 0);

    return { income, expense: Math.abs(expense) };
  } catch (error) {
    return { error: "database Error" };
  }
}

export default getIncomeExpense;
