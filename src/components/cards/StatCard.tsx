import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { classNames } from "../../utils/classNames";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { useTheme } from "../../contexts/ThemeContext";

interface StatCardProps {
  title: string;
  amount: number;
  percentageChange: number;
  period?: string;
  chartData?: number[];
}

const StatCard = ({
  title,
  amount,
  percentageChange,
  period = "this month",
  chartData,
}: StatCardProps) => {
  const { isDarkMode } = useTheme();
  const isPositive = percentageChange > 0;

  return (
    <div className="relative overflow-hidden bg-white dark:bg-[#56459E] rounded-2xl p-4 border border-gray-100 dark:border-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <select className="text-sm text-gray-500 dark:text-gray-400 bg-transparent">
          <option>{period}</option>
          <option>last month</option>
        </select>
      </div>

      <div className="mb-10">
        <span className="text-xl font-normal">
          ${amount.toFixed(2).split(".")[0]}
          <span className="text-xs">.{amount.toFixed(2).split(".")[1]}</span>
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
            <ArrowUpIcon className="w-3 h-3 mr-0.5" />
          ) : (
            <ArrowDownIcon className="w-3 h-3 mr-0.5" />
          )}
          <span className="text-[10px]">
            {isPositive ? "+" : ""}
            {percentageChange}%
          </span>
        </div>

        <div className="absolute -bottom-2 -right-2 w-[70%] h-[80%]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData?.map((value) => ({ value }))}>
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
