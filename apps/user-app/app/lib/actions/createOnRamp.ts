"use server";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import db from "@repo/db/client";

export async function createOnRamp(amount: number, provider: string) {
  console.log("ASdasds");
  const sesssion = await getServerSession(authOptions);
  const userId = sesssion?.user?.id;
  const userIdNumber = Number(userId);
  console.log("asdasd : " + userId);

  if (!userId) {
    return {
      message: "You are currently not logged in !",
    };
  }

  await db.onRampTransaction.create({
    data: {
      status: "Processing",
      amount: amount,
      provider: provider,
      token: Math.random().toString(),
      startTime: new Date(),
      userId: userIdNumber,
    },
  });
  console.log("done");

  return {
    message: "On Ramp Transactions added successfully!",
  };
}
