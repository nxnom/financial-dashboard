import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { classNames } from './utils/classNames'
import StatCard from './components/cards/StatCard'

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

function AppContent() {
  const { isDarkMode } = useTheme()

  return (
    <div className={classNames(
      'min-h-screen',
      isDarkMode ? 'dark bg-[#392D6B] text-white' : 'bg-[#F7F6FB]'
    )}>
      <style>
        {`html {
          background-color: ${isDarkMode ? '#392D6B' : '#F7F6FB'};
        }`}
      </style>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <Header />

          <div className="flex gap-6">
            <div className="flex-[3] space-y-6">
              <div className="grid grid-cols-3 gap-3">
                <StatCard
                  title="Income"
                  amount={6558.67}
                  percentageChange={16}
                  chartData={[
                    0, 30, 25, 29, 15, 33, 50, 35, 55,
                  ]}
                />
                <StatCard
                  title="Expenses"
                  amount={1420.05}
                  percentageChange={-36}
                  chartData={[
                    0, 28, 22, 26, 14, 31, 48
                  ]}
                />
                <StatCard
                  title="Investment"
                  amount={950.35}
                  percentageChange={12}
                  chartData={[
                    0, 16, 14, 25, 20, 21, 12, 30, 25, 60
                  ]}
                />
              </div>

              {/* Charts section */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 bg-red-500">
                  {/* <RevenueChart /> */}
                </div>
                <div className="col-span-1">
                  {/* <FinancialAnalysis /> */}
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
  )
}

export default App
