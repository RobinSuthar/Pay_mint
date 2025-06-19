"use server";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import db from "@repo/db/client";

export async function createOnRamp(amount: number, provider: string) {
  const sesssion = await getServerSession(authOptions);
  const userId = sesssion.user.id;
  console.log(sesssion);

  if (!userId) {
    return {
      message: "You are currently not logged in !",
    };
  }

  await db.onRampTransaction.create({
    data: {
      id: userId,
      status: "Processing",
      amount: amount,
      provider: provider,
      token: Math.random().toString(),
      startTime: new Date(),
      user: sesssion.user.name,
    },
  });

  return {
    message: "On Ramp Transactions added successfully!",
  };
}
