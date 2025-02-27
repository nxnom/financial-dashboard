import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface DataPoint {
  month: string;
  income: number;
  expenses: number;
}

interface FinancialAnalysisProps {
  data: {
    thisMonth: DataPoint[];
    previousMonth: DataPoint[];
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    color: string;
  }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#56459E] p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-300 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const FinancialAnalysis = ({ data }: FinancialAnalysisProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "thisMonth" | "previousMonth"
  >("thisMonth");
  const currentData = data[selectedPeriod];

  return (
    <div className="flex flex-col bg-white dark:bg-[#56459E] rounded-2xl p-4 h-[310px] shadow-lg shadow-gray-300/50 dark:shadow-black/10">
      <div className="flex justify-between items-baseline mb-3">
        <h3 className="text-lg font-medium whitespace-pre-wrap">
          {"Financial\nanalysis"}
        </h3>
        <select
          className="text-sm text-gray-500 dark:text-gray-400 bg-transparent"
          value={selectedPeriod}
          onChange={(e) =>
            setSelectedPeriod(e.target.value as "thisMonth" | "previousMonth")
          }
        >
          <option value="thisMonth">this month</option>
          <option value="previousMonth">last month</option>
        </select>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center">
          <div
            className="w-3 h-3 rounded-full 
                    bg-gradient-to-b from-[#FE7177] to-[#E652FE] mr-2"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Expenses
          </span>
        </div>
        <div className="flex items-center">
          <div
            className="w-3 h-3 rounded-full 
                    bg-gradient-to-b from-[#A632FF] to-[#5ABFFF] mr-2"
          ></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Income
          </span>
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={currentData} barGap={4} barCategoryGap={6}>
            <defs>
              <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FE7177" stopOpacity={1} />
                <stop offset="100%" stopColor="#E652FE" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A632FF" stopOpacity={1} />
                <stop offset="100%" stopColor="#5ABFFF" stopOpacity={1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              fontSize={12}
              stroke="#9CA3AF"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              fontSize={12}
              stroke="#9CA3AF"
              width={30}
              tickFormatter={(value) => `$${Math.floor(value / 1000)}k`}
            />
            <CartesianGrid
              strokeDasharray="4 10"
              stroke="#9CA3AF"
              vertical={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                fill: "rgba(208, 207, 207, 0.2)",
                radius: 4,
              }}
            />
            <Bar dataKey="expenses" fill="url(#expensesGradient)" radius={4} />
            <Bar dataKey="income" fill="url(#incomeGradient)" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialAnalysis;
