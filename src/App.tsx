import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { classNames } from "./utils/classNames";
import StatCard from "./components/cards/StatCard";
import RevenueChart from "./components/charts/RevenueChart";
import FinancialAnalysis from "./components/charts/FinancialAnalysis";

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={classNames(
        "min-h-screen",
        isDarkMode ? "dark bg-[#392D6B] text-white" : "bg-[#F7F6FB]",
      )}
    >
      <style>
        {`html {
          background-color: ${isDarkMode ? "#392D6B" : "#F7F6FB"};
        }`}
      </style>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <Header />

          <div className="flex gap-3">
            <div className="flex-[3] space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <StatCard
                  title="Income"
                  data={{
                    thisMonth: {
                      amount: 6558.67,
                      percentageChange: 16,
                      chartData: [0, 30, 25, 29, 15, 33, 50, 35, 55],
                    },
                    previousMonth: {
                      amount: 5890.42,
                      percentageChange: -40,
                      chartData: [0, 25, 20, 35, 22, 28, 45, 30, 50],
                    },
                  }}
                />
                <StatCard
                  title="Expenses"
                  data={{
                    thisMonth: {
                      amount: 1420.05,
                      percentageChange: -36,
                      chartData: [0, 28, 22, 26, 14, 31, 48],
                    },
                    previousMonth: {
                      amount: 1850.32,
                      percentageChange: -28,
                      chartData: [0, 35, 30, 40, 32, 38, 52],
                    },
                  }}
                />
                <StatCard
                  title="Investment"
                  data={{
                    thisMonth: {
                      amount: 950.35,
                      percentageChange: 12,
                      chartData: [0, 16, 14, 25, 20, 21, 12, 30, 25, 60],
                    },
                    previousMonth: {
                      amount: 875.2,
                      percentageChange: 8,
                      chartData: [0, 12, 10, 20, 15, 18, 10, 25, 20, 50],
                    },
                  }}
                />
              </div>

              {/* Charts section */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <RevenueChart
                    data={[
                      { month: "Jan", revenue2021: 4000, revenue2020: 10000 },
                      { month: "Feb", revenue2021: 9000, revenue2020: 14000 },
                      { month: "Mar", revenue2021: 6000, revenue2020: 13000 },
                      { month: "Apr", revenue2021: 10000, revenue2020: 16000 },
                      { month: "May", revenue2021: 14000, revenue2020: 6000 },
                      { month: "Jun", revenue2021: 7000, revenue2020: 17000 },
                      { month: "Jul", revenue2021: 8000, revenue2020: 10000 },
                      { month: "Aug", revenue2021: 6000, revenue2020: 4000 },
                      { month: "Sep", revenue2021: 7000, revenue2020: 8000 },
                      { month: "Oct", revenue2021: 14000, revenue2020: 10000 },
                      { month: "Nov", revenue2021: 10000, revenue2020: 7000 },
                      { month: "Dec", revenue2021: 15000, revenue2020: 12000 },
                    ]}
                  />
                </div>
                <div className="col-span-1">
                  <FinancialAnalysis
                    data={{
                      thisMonth: [
                        { month: "Feb", income: 2900, expenses: 2100 },
                        { month: "Mar", income: 1200, expenses: 400 },
                        { month: "Apr", income: 2100, expenses: 2500 },
                        { month: "May", income: 2900, expenses: 2000 },
                        { month: "Jun", income: 2200, expenses: 1800 },
                        { month: "Jul", income: 3000, expenses: 2900 },
                      ],
                      previousMonth: [
                        { month: "Feb", income: 2500, expenses: 1800 },
                        { month: "Mar", income: 1000, expenses: 600 },
                        { month: "Apr", income: 1800, expenses: 2200 },
                        { month: "May", income: 2600, expenses: 1700 },
                        { month: "Jun", income: 2000, expenses: 1500 },
                        { month: "Jul", income: 2700, expenses: 2500 },
                      ],
                    }}
                  />
                </div>
              </div>

              {/* Bottom section */}
              <div className="grid grid-cols-3 gap-3">
                {/* <ExpensesBreakdown />
                <TransactionsList />
                <InvestmentList /> */}
              </div>
            </div>

            {/* Right group - Cards and transfers */}
            <div className="flex-1 space-y-6">
              {/* <MyCards />
              <QuickTransfers />
              <Goals /> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
