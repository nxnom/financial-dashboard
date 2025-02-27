import { useState } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import Pagination from "./ui/Pagination";
import { classNames } from "../utils/classNames";
import Avatar from "./ui/Avatar";

interface Investment {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changeAmount: number;
  logo: string;
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
    <div className="flex h-[280px] flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-lg shadow-gray-300/50 dark:bg-[#56459E] dark:shadow-black/10">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Investment</h3>
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
          <option value="week">week</option>
        </select>
      </div>

      <div
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <div className="space-y-1">
          {currentData.map((investment) => (
            <div
              key={investment.id}
              className="border-b-[0.5px] border-gray-100 pb-1 last:border-b-0 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar>
                    {
                      <img
                        src={investment.logo}
                        alt={investment.symbol}
                        className={classNames(
                          "h-5 w-5 object-contain",
                          investment.symbol === "AAPL" && "h-4 w-4",
                          investment.symbol === "NFLX" && "h-6 w-6",
                        )}
                      />
                    }
                  </Avatar>
                  <div>
                    <div className="line-clamp-1 text-sm font-medium">
                      {investment.symbol}
                    </div>
                    <div className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                      {investment.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div
                    className={classNames(
                      "mr-4 flex items-center",
                      investment.change > 0 ? "text-blue-500" : "text-red-500",
                    )}
                  >
                    {investment.change > 0 ? (
                      <ArrowUpIcon className="mr-1 h-3 w-3 rotate-45" />
                    ) : (
                      <ArrowDownIcon className="mr-1 h-3 w-3 -rotate-45" />
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
