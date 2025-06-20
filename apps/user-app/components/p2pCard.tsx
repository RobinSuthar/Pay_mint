import { Card } from "@repo/ui/card";

export const P2PTranscation = ({
  transactions,
}: {
  transactions: {
    id: number;
    amount: number;

    timestamp: Date;
    fromUserId: number;

    toUserId: number;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div key={t.id} className="flex justify-between">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {t.timestamp.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {t.amount / 100}
            </div>
            <div className="flex flex-col justify-center">+ Rs {t.amount}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};
