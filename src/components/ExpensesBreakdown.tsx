import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ExpenseCategory {
  name: string;
  value: number;
  color: string;
}

interface ExpensesBreakdownProps {
  data: {
    thisMonth: {
      total: number;
      change: string;
      categories: ExpenseCategory[];
    };
    previousMonth: {
      total: number;
      change: string;
      categories: ExpenseCategory[];
    };
  };
}

const ExpensesBreakdown = ({ data }: ExpensesBreakdownProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "thisMonth" | "previousMonth"
  >("thisMonth");
  const currentData = data[selectedPeriod];

  return (
    <div className="flex h-[280px] flex-col rounded-2xl bg-white p-4 shadow-lg shadow-gray-300/50 dark:bg-[#56459E] dark:shadow-black/10">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-medium">Expenses</h3>
        <select
          className="bg-transparent text-sm text-gray-500 dark:text-gray-400"
          value={selectedPeriod}
          onChange={(e) =>
            setSelectedPeriod(e.target.value as "thisMonth" | "previousMonth")
          }
        >
          <option value="thisMonth">last week</option>
          <option value="previousMonth">previous week</option>
        </select>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative w-4/10">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={currentData.categories}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={45}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
              >
                {currentData.categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
            <div className="text-md font-normal">
              ${currentData.total.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="w-6/10 pl-2">
          {currentData.categories.map((category, index) => (
            <div key={index} className="mb-1 flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="mr-2 h-2 w-2 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-xs">{category.name}</span>
              </div>
              <span className="text-xs">${category.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400">
        You have spent {currentData.change} money this week than last week.
      </div>
    </div>
  );
};

export default ExpensesBreakdown;
