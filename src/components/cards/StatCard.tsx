import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { classNames } from "../../utils/classNames";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { useTheme } from "../../contexts/ThemeContext";
import { useState } from "react";

interface PeriodData {
  amount: number;
  percentageChange: number;
  chartData: number[];
}

interface StatCardProps {
  title: string;
  data: {
    thisMonth: PeriodData;
    previousMonth: PeriodData;
  };
}

const StatCard = ({ title, data }: StatCardProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "thisMonth" | "previousMonth"
  >("thisMonth");
  const { isDarkMode } = useTheme();

  const currentData = data[selectedPeriod];
  const isPositive = currentData.percentageChange > 0;
  const chartData = currentData.chartData.map((value) => ({ value }));

  return (
    <div className="relative overflow-hidden bg-white dark:bg-[#56459E] rounded-2xl p-3 sm:p-4 border border-gray-100 dark:border-0 h-[140px] sm:h-[159px] shadow-lg shadow-gray-300/50 dark:shadow-black/10">
      <div className="flex justify-between items-center mb-2 sm:mb-4">
        <h3 className="text-base sm:text-lg font-medium">{title}</h3>
        <select
          className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-transparent"
          value={selectedPeriod}
          onChange={(e) =>
            setSelectedPeriod(e.target.value as "thisMonth" | "previousMonth")
          }
        >
          <option value="thisMonth">this month</option>
          <option value="previousMonth">last month</option>
        </select>
      </div>

      <div className="mb-6 sm:mb-10">
        <span className="text-lg sm:text-xl font-normal">
          ${currentData.amount.toFixed(2).split(".")[0]}
          <span className="text-[10px] sm:text-xs">
            .{currentData.amount.toFixed(2).split(".")[1]}
          </span>
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div
          className={classNames(
            "flex items-center",
            isPositive ? "text-[#75A3FF]" : "text-red-500",
          )}
        >
          {isPositive ? (
            <ArrowUpIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 rotate-45" />
          ) : (
            <ArrowDownIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 -rotate-45" />
          )}
          <span className="text-[8px] sm:text-[10px]">
            {isPositive ? "+" : ""}
            {currentData.percentageChange}%
          </span>
        </div>

        <div className="absolute -bottom-2 -right-2 w-[65%] sm:w-[70%] h-[75%] sm:h-[80%]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="1" y2="0">
                  <stop
                    offset="5%"
                    stopColor={isDarkMode ? "#505FAD" : "#E9F3FE"}
                    stopOpacity={0.1}
                  />
                  <stop
                    offset="95%"
                    stopColor={isDarkMode ? "#935AD6" : "#E9DDF9"}
                    stopOpacity={1}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8B8FFE"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
