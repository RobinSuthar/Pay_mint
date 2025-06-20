"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";
export async function Getp2pTransfer() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const p2pTransfers = await db.p2pTransfer.findMany({
    where: {
      id: Number(session.user.id), // assuming your table has a 'userId' field
    },
    orderBy: {
      timestamp: "desc", // optional: latest first
    },
  });

  console.log(p2pTransfers); // should now log an array
  return p2pTransfers;
}
