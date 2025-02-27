import {
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { parseAsBoolean, useQueryState } from "nuqs";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useQueryState(
    "sidebar",
    parseAsBoolean.withDefault(false),
  );

  return (
    <header className="sticky top-0 z-100 -mx-6 mb-2 flex items-center justify-between bg-white px-6 pt-4 pb-4 lg:bg-[#F7F6FB] dark:bg-[#2D2351] dark:text-[#DFDDEB] lg:dark:bg-[#392D6B]">
      <div className="flex items-center gap-x-2">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-md bg-white p-2 shadow-md xl:hidden dark:bg-[#473D7B]"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <XMarkIcon className="h-5 w-5" />
          ) : (
            <Bars3Icon className="h-5 w-5" />
          )}
        </button>
        <h1 className="hidden text-2xl font-semibold md:block">Dashboard</h1>
        <img
          src="/logo.png"
          className="block w-10 object-contain sm:w-14 md:hidden"
          alt="Wallet"
        />
      </div>

      <div className="hidden items-center space-x-4 md:flex">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="h-8 rounded-lg border border-gray-200 bg-white py-2 pr-10 pl-4 text-sm placeholder:text-gray-300 focus:outline-none dark:border-gray-700 dark:bg-[#56459E] dark:placeholder:text-gray-500"
          />
          <MagnifyingGlassIcon className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
        </div>

        <div className="flex h-8 items-center space-x-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-[#56459E]">
          <div className="relative mr-16 flex items-center space-x-3">
            <img
              src="/avatar.png"
              alt="Profile"
              className="absolute -left-6 h-16 w-16"
            />
            <p className="ml-9 text-sm font-medium">Hello, Michaela!</p>
          </div>
          <button className="py-1">
            <EnvelopeIcon className="h-5 w-5" />
          </button>
          <button className="relative py-1">
            <BellIcon className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#9898EE] text-xs text-white dark:bg-[#8F82C9]">
              5
            </span>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-1 md:hidden">
        <img src="/avatar.png" alt="Profile" className="w-10 object-contain" />
        <p className="text-sm font-medium">Hello, Michaela!</p>
      </div>
    </header>
  );
};

export default Header;
