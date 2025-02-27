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
    <div className="bg-white dark:bg-[#56459E] rounded-2xl p-4 h-[320px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Expenses</h3>
        <select
          className="text-sm text-gray-500 dark:text-gray-400 bg-transparent"
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
        <div className="w-4/10 relative">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={currentData.categories}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={55}
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
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-xl font-semibold">
              ${currentData.total.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="w-6/10 pl-2">
          {currentData.categories.map((category, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm">{category.name}</span>
              </div>
              <span className="text-xs">${category.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
        You have spent {currentData.change} money this week than last week.
      </div>
    </div>
  );
};

export default ExpensesBreakdown;
