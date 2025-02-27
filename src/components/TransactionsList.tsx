import { useState } from "react";
import {
  ArrowRightIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import Pagination from "./ui/Pagination";
import { classNames } from "../utils/classNames";

interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  isDebit: boolean;
  type: "transfer" | "taxi" | "supermarket" | "reward";
  paymentMethod: string;
}

interface TransactionsListProps {
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
        return (
          <ArrowRightIcon className="w-4 h-4 text-gray-500 dark:text-[#DAD4F4]" />
        );
      case "taxi":
        return (
          <TruckIcon className="w-4 h-4 text-gray-500 dark:text-[#DAD4F4]" />
        );
      case "supermarket":
        return (
          <ShoppingBagIcon className="w-4 h-4 text-gray-500 dark:text-[#DAD4F4]" />
        );
      case "reward":
        return (
          <CurrencyDollarIcon className="w-4 h-4 text-gray-500 dark:text-[#DAD4F4]" />
        );
      default:
        return (
          <CurrencyDollarIcon className="w-4 h-4 text-gray-500 dark:text-[#DAD4F4]" />
        );
    }
  };

  return (
    <div className="bg-white dark:bg-[#56459E] rounded-2xl p-4 h-[340px] overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Transactions</h3>
        <select
          className={classNames(
            "text-sm bg-transparent",
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

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-3">
          {currentData.map((transaction) => (
            <div key={transaction.id} className="pb-3 border-b-[0.5px] border-gray-100 dark:border-gray-700 last:border-b-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={classNames(
                      "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                      "bg-gradient-to-r from-[#EFF4FE] to-[#EBDBFE] dark:from-[#5362B3] dark:to-[#6E50B5]",
                    )}
                  >
                    {getIcon(transaction.type)}
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {transaction.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
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
