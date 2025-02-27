import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { classNames } from './utils/classNames'

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
        </main>
      </div>
    </div>
  )
}

export default App
