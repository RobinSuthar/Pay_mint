"use client";
import { getServerSession } from "next-auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { P2P } from "../../../components/p2p";
import { authOptions } from "../../lib/auth";
import db from "@repo/db/client";
import { P2PTranscation } from "../../../components/p2pCard";
import P2pHistory from "../../lib/actions/p2phistory";

async function getBalance() {
  const currentUser = await P2pHistory();
}

export default async function () {
  const p2p = await getBalance();
  console.log(p2p);
  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        P2P Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <P2P />
        </div>
        <div></div>
      </div>
    </div>
  );
}
