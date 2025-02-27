import {
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { parseAsBoolean, useQueryState } from "nuqs";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useQueryState("sidebar", parseAsBoolean.withDefault(false));

  return (
    <header className="flex sticky top-0 z-100 -mx-6 px-6 pt-4 pb-4 mb-2 items-center justify-between dark:text-[#DFDDEB] bg-white lg:bg-[#F7F6FB] dark:bg-[#2D2351] lg:dark:bg-[#392D6B]">
      <div className="flex items-center gap-x-2">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="xl:hidden p-2 rounded-md bg-white dark:bg-[#473D7B] shadow-md"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? (
          <XMarkIcon className="w-5 h-5" />
        ) : (
          <Bars3Icon className="w-5 h-5" />
        )}
      </button>
        <h1 className="text-2xl font-semibold hidden md:block">Dashboard</h1>
        <img src='/logo.png' className="w-10 sm:w-14 object-contain block md:hidden" alt="Wallet" />
      </div>

      <div className="hidden md:flex items-center space-x-4 ">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="h-8 text-sm pr-10 pl-4 py-2 rounded-lg bg-white dark:bg-[#56459E] focus:outline-none border border-gray-200 dark:border-gray-700"
          />
          <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="h-8 flex items-center space-x-1.5 rounded-lg bg-white dark:bg-[#56459E] px-4 py-2 border border-gray-200 dark:border-gray-700">
          <div className="relative flex items-center space-x-3 mr-16">
            <img
              src="/avatar.png"
              alt="Profile"
              className="w-16 h-16 absolute -left-6"
            />
            <p className="ml-9 font-medium text-sm">Hello, Michaela!</p>
          </div>
          <button className="py-1">
            <EnvelopeIcon className="w-5 h-5" />
          </button>
          <button className="py-1 relative">
            <BellIcon className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 text-white text-xs w-4 h-4 flex items-center justify-center bg-[#9898EE] dark:bg-[#8F82C9] rounded-full">
              5
            </span>
          </button>
        </div>
      </div>

      <div className="md:hidden flex items-center space-x-1">
          <img
              src="/avatar.png"
              alt="Profile"
              className="w-10 object-contain"
            />
            <p className="font-medium text-sm">Hello, Michaela!</p>
          </div>
    </header>
  );
};

export default Header;
