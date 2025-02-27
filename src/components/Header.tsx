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
    <header className="sticky top-0 right-0 left-0 z-100 mb-4 flex items-center justify-between bg-white px-6 py-6 shadow-lg shadow-gray-300/50 xl:mb-2 xl:bg-[#F7F6FB] xl:shadow-none dark:bg-[#2D2351] dark:text-[#DFDDEB] dark:shadow-black/10 xl:dark:bg-[#392D6B]">
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
        <h1 className="hidden text-2xl md:block">Dashboard</h1>
        <img
          src="/logo.png"
          className="block w-14 object-contain md:hidden"
          alt="Wallet"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="h-8 w-38 rounded-lg border border-gray-200 bg-white py-2 pr-10 pl-4 text-sm placeholder:text-gray-300 focus:outline-none md:w-auto dark:border-gray-700 dark:bg-[#56459E] dark:placeholder:text-gray-500"
          />
          <MagnifyingGlassIcon className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
        </div>

        <div className="flex h-8 items-center space-x-1.5 rounded-lg border-gray-200 py-2 lg:border lg:bg-white lg:px-4 lg:dark:border-gray-700 lg:dark:bg-[#56459E]">
          <div className="relative mr-12 hidden items-center space-x-3 lg:flex">
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
    </header>
  );
};

export default Header;
