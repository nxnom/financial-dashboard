import { useState } from "react";
import {
  ArrowRightIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import Pagination from "./ui/Pagination";
import { classNames } from "../utils/classNames";
import Avatar from "./ui/Avatar";

export interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  isDebit: boolean;
  type: "transfer" | "taxi" | "supermarket" | "reward";
  paymentMethod: string;
}

export interface TransactionsListProps {
  data: {
    today: Transaction[];
    yesterday: Transaction[];
  };
}

const TransactionsList = ({ data }: TransactionsListProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "yesterday">(
    "today",
  );
  const currentData = data[selectedPeriod];

  const formatAmount = (amount: number, isDebit: boolean) => {
    return `${isDebit ? "-" : "+"}$${amount.toFixed(2)}`;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "transfer":
        return <ArrowRightIcon className="h-4 w-4 text-[#A195AD]" />;
      case "taxi":
        return <TruckIcon className="h-4 w-4 text-[#A195AD]" />;
      case "supermarket":
        return <ShoppingBagIcon className="h-4 w-4 text-[#A195AD]" />;
      case "reward":
        return <CurrencyDollarIcon className="h-4 w-4 text-[#A195AD]" />;
      default:
        return <CurrencyDollarIcon className="h-4 w-4 text-[#A195AD]" />;
    }
  };

  return (
    <div className="flex h-[280px] flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-lg shadow-gray-300/50 dark:bg-[#56459E] dark:shadow-black/10">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Transactions</h3>
        <select
          className={classNames(
            "bg-transparent text-sm",
            "text-gray-500 dark:text-gray-400",
          )}
          value={selectedPeriod}
          onChange={(e) =>
            setSelectedPeriod(e.target.value as "today" | "yesterday")
          }
        >
          <option value="today">today</option>
          <option value="yesterday">yesterday</option>
        </select>
      </div>

      <div
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <div className="space-y-1">
          {currentData.map((transaction) => (
            <div
              key={transaction.id}
              className="border-b-[0.5px] border-gray-100 pb-1 last:border-b-0 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar>{getIcon(transaction.type)}</Avatar>
                  <div>
                    <div className="line-clamp-1 text-sm font-medium">
                      {transaction.name}
                    </div>
                    <div className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                      {transaction.category}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={classNames(
                      "text-sm",
                      transaction.isDebit ? "text-red-500" : "text-blue-500",
                    )}
                  >
                    {formatAmount(transaction.amount, transaction.isDebit)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {transaction.paymentMethod}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Pagination
          items={["today", "yesterday"]}
          activeItem={selectedPeriod}
          onChange={(item) => setSelectedPeriod(item as "today" | "yesterday")}
        />
      </div>
    </div>
  );
};

export default TransactionsList;
