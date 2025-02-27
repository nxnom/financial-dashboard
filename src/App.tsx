import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useTheme } from "./contexts/ThemeContext";
import { classNames } from "./utils/classNames";
import StatCard from "./components/cards/StatCard";
import RevenueChart from "./components/charts/RevenueChart";
import FinancialAnalysis from "./components/charts/FinancialAnalysis";
import ExpensesBreakdown from "./components/ExpensesBreakdown";
import TransactionsList, { TransactionsListProps } from "./components/TransactionsList";
import InvestmentList from "./components/InvestmentList";
import MyCards, { Card } from "./components/MyCards";
import QuickTransfers from "./components/QuickTransfers";
import Goals, { Goal } from "./components/Goals";
import { parseAsBoolean, useQueryState } from "nuqs";
import mockData from "./data.json";

function App() {
  const { isDarkMode } = useTheme();
  const [sidebarOpen] = useQueryState("sidebar", parseAsBoolean.withDefault(false));

  return (
    <div
      className={classNames(
        "min-h-screen",
        isDarkMode ? "dark bg-[#392D6B] text-white" : "bg-[#F7F6FB]",
      )}
    >
      <div className="flex">
        <Sidebar />
        <main className={classNames(
          "flex-1 px-3 sm:px-6 pb-6 transition-all duration-300",
          "xl:ml-64",
          sidebarOpen ? "ml-0" : "ml-0"
        )}>
          <Header />

          <div className="flex flex-col xl:flex-row gap-3">
            <div className="w-full xl:flex-[3] space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <StatCard
                  title="Income"
                  data={mockData.stats.income}
                />
                <StatCard
                  title="Expenses"
                  data={mockData.stats.expenses}
                />
                <StatCard
                  title="Investment"
                  data={mockData.stats.investment}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="lg:col-span-2">
                  <RevenueChart data={mockData.revenue} />
                </div>
                <div className="lg:col-span-1">
                  <FinancialAnalysis data={mockData.financialAnalysis} />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="lg:col-span-1">
                  <ExpensesBreakdown data={mockData.expensesBreakdown} />
                </div>
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TransactionsList data={mockData.transactions as unknown as TransactionsListProps['data']} />
                    <InvestmentList data={mockData.investments} />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full xl:flex-1 xl:max-w-[350px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-2">
              <MyCards cards={mockData.cards as unknown as Card[]} />
              <QuickTransfers contacts={mockData.contacts} />
              <Goals 
                goals={mockData.goals as Goal[]}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
