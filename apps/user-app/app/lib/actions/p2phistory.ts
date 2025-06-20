"use server";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";

export default async function P2pHistory() {
  const user = await getServerSession(authOptions);
  return user;
}
