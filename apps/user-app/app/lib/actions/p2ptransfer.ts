"use server";
import { useSession } from "next-auth/react";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import db from "@repo/db/client";
import prisma from "@repo/db/client";
import { cleanDistDir } from "../../../next.config";

export default async function P2pTransction(to: string, amountt: number) {
  console.log("Asdasdasdasd");
  const user = await getServerSession(authOptions);
  const from = user?.user;
  if (!user?.user?.name) {
    return {
      message: "You are not logged in",
    };
  }

  const Reciver = await db.user.findUnique({
    where: {
      number: to,
    },
  });

  if (!Reciver) {
    console.log("Incorrect phone number provider of the reciver");

    return {
      message: "Provided Phone Number doesn't exist!",
    };
  }
  console.log("wqwqw");

  // Make Dedeuction and addition
  //   model Balance {
  //   id     Int  @id @default(autoincrement())
  //   userId Int  @unique
  //   amount Int
  //   locked Int
  //   user   User @relation(fields: [userId], references: [id])
  // // }
  try {
    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`
      SELECT * FROM "User"
      WHERE "id" = ${Number(from)}
      FOR UPDATE`;

      const fromBalance = await tx.balance.findUnique({
        where: {
          userId: Number(from.id),
        },
      });

      console.log("hhhhhh");
      if (!fromBalance || fromBalance.amount < amountt) {
        console.log("No Money");
        return { meesage: "Insufficient Funds" };
      }
      console.log("bbbb");
      await tx.balance.update({
        where: { userId: Number(from.id) },
        data: { amount: { decrement: amountt } },
      });
      console.log("Ssss");
      await tx.balance.update({
        where: { userId: Reciver.id },
        data: { amount: { increment: amountt } },
      });

      await tx.p2pTransfer.create({
        data: {
          fromUserId: from,
          toUserId: Number(to),
          amount: amountt,
          timestamp: new Date(),
        },
      });
      console.log("Successef");
      return {
        message: "Done Successfully",
      };
    });
  } catch (e) {
    console.log(e);
    return e;
  }
}
