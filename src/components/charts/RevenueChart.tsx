import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  AreaChart,
  Area,
} from "recharts";
import { useTheme } from "../../contexts/ThemeContext";

interface DataPoint {
  month: string;
  revenue2021: number;
  revenue2020: number;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
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
            {entry.name === "revenue2021" ? "2021: " : "2020: "}$
            {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const RevenueChart = ({ data }: { data: DataPoint[] }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex flex-col bg-white dark:bg-[#56459E] rounded-2xl p-4 h-[310px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Revenue analysis</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              2021
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              2020
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 2, right: 0, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="revenue2021" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isDarkMode ? "#505FAD" : "#E9F3FE"}
                  stopOpacity={0.9}
                />
                <stop
                  offset="95%"
                  stopColor={isDarkMode ? "#935AD6" : "#E9DDF9"}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="revenue2020" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isDarkMode ? "#505FAD" : "#F8E1F2"}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={isDarkMode ? "#935AD6" : "#ECDAFE"}
                  stopOpacity={0.2}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 10"
              stroke="#9CA3AF"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={35}
              domain={[
                0,
                (dataMax: number) => Math.ceil(dataMax / 5000) * 5000,
              ]}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="revenue2020"
              stroke={isDarkMode ? "#D539BD80" : "#EC4899"}
              strokeWidth={2}
              fillOpacity={1}
              dot={false}
              fill="url(#revenue2020)"
            />
            <Area
              type="monotone"
              dataKey="revenue2021"
              stroke={"#8B5CF6"}
              strokeWidth={2}
              fillOpacity={1}
              dot={false}
              fill="url(#revenue2021)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
