"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import P2pTransction from "../app/lib/actions/p2ptransfer";

export const P2P = () => {
  const [to, setTo] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  return (
    <Card title="Send Money">
      <div className="w-full flex flex-col justify-center">
        <div className="">
          <TextInput
            label={"Phone Number"}
            placeholder={"Phone Number"}
            onChange={(e) => {
              setTo(e);
            }}
          />
        </div>

        <div className="">
          <TextInput
            label={"Amount "}
            placeholder={"Amount"}
            onChange={(e) => {
              setAmount(Number(e));
            }}
          />
        </div>

        <div className="mt-5 ">
          <Button
            onClick={async () => {
              P2pTransction(to, amount);
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
};
