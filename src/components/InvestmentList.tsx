import { useState } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import Pagination from "./ui/Pagination";
import { classNames } from "../utils/classNames";

interface Investment {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changeAmount: number;
  logo?: string;
}

interface InvestmentListProps {
  data: {
    today: Investment[];
    yesterday: Investment[];
    week: Investment[];
  };
}

const InvestmentList = ({ data }: InvestmentListProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "today" | "yesterday" | "week"
  >("today");
  const currentData = data[selectedPeriod];

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  const formatChange = (change: number) => {
    return `${change > 0 ? "+" : ""}${change.toFixed(2)}%`;
  };

  const formatChangeAmount = (amount: number) => {
    return `${amount > 0 ? "+" : ""}$${Math.abs(amount).toFixed(2)}`;
  };

  return (
    <div className="bg-white dark:bg-[#56459E] rounded-2xl p-4 h-[340px] overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Investment</h3>
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
          <option value="week">week</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-3">
          {currentData.map((investment) => (
            <div key={investment.id} className="pb-3 border-b-[0.5px] border-gray-100 dark:border-gray-700 last:border-b-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={classNames(
                      "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                      "bg-gradient-to-r from-[#EFF4FE] to-[#EBDBFE] dark:from-[#5362B3] dark:to-[#6E50B5]",
                    )}
                  >
                    {investment.logo ? (
                      <img
                        src={investment.logo}
                        alt={investment.symbol}
                        className={classNames(
                          "w-5 h-5 object-contain",
                          investment.symbol === "AAPL" && "w-4 h-4",
                          investment.symbol === "NFLX" && "w-6 h-6",
                        )}
                      />
                    ) : (
                      <span className="text-xs font-bold">
                        {investment.symbol.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {investment.symbol}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {investment.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div
                    className={classNames(
                      "flex items-center mr-4",
                      investment.change > 0 ? "text-blue-500" : "text-red-500",
                    )}
                  >
                    {investment.change > 0 ? (
                      <ArrowUpIcon className="w-3 h-3 mr-1 rotate-45" />
                    ) : (
                      <ArrowDownIcon className="w-3 h-3 mr-1 -rotate-45" />
                    )}
                    <span className="text-xs">
                      {formatChange(investment.change)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {formatPrice(investment.price)}
                    </div>
                    <div
                      className={classNames(
                        "text-xs",
                        investment.changeAmount > 0
                          ? "text-blue-500"
                          : "text-red-500",
                      )}
                    >
                      {formatChangeAmount(investment.changeAmount)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Pagination
          items={["today", "yesterday", "week"]}
          activeItem={selectedPeriod}
          onChange={(item) =>
            setSelectedPeriod(item as "today" | "yesterday" | "week")
          }
        />
      </div>
    </div>
  );
};

export default InvestmentList;
