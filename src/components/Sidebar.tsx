import {
  HomeIcon,
  WalletIcon,
  ArrowPathIcon,
  GiftIcon,
  CreditCardIcon,
  UserIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../contexts/ThemeContext";
import { classNames } from "../utils/classNames";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useEffect } from "react";

const Sidebar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useQueryState(
    "sidebar",
    parseAsBoolean.withDefault(false),
  );

  const menuItems = [
    { icon: HomeIcon, label: "Dashboard", active: true },
    { icon: WalletIcon, label: "Wallet" },
    { icon: ArrowPathIcon, label: "Transactions", badge: 1 },
    { icon: GiftIcon, label: "Cashback", badge: 4 },
    { icon: CreditCardIcon, label: "Payments" },
    { icon: ArrowPathIcon, label: "Investment" },
    { icon: UserIcon, label: "Profile" },
    { icon: QuestionMarkCircleIcon, label: "Support" },
  ];

  useEffect(() => {
    if (sidebarOpen) {
      document.body.className = "overflow-hidden xl:overflow-auto";
    } else {
      document.body.className = "overflow-auto";
    }
  }, [sidebarOpen]);

  return (
    <>
      <div
        className={classNames(
          "fixed inset-0 z-30 bg-black/50 transition-opacity xl:hidden",
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={classNames(
          "fixed top-0 left-0 z-40 h-screen bg-white dark:bg-[#2D2351]",
          "transition-transform duration-300 ease-in-out",
          "xl:w-64 xl:translate-x-0",
          "shadow-lg shadow-gray-300/50 dark:shadow-black/10",
          sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full",
        )}
      >
        <div className="mb-8 flex items-center px-6 pt-6 opacity-0 xl:opacity-100">
          <img
            src="/logo.png"
            className="h-12 w-12 object-contain"
            alt="Wallet"
          />
          <span className="mt-1 ml-2 text-lg text-gray-900 dark:text-white">
            Wallet
          </span>
        </div>

        <nav className="space-y-1 text-sm">
          {menuItems.map((item) => (
            <MenuItem key={item.label} {...item} />
          ))}
        </nav>

        <div className="mt-5 w-full space-y-2 border-t border-gray-200 pt-5 dark:border-gray-700">
          <MenuItem icon={Cog6ToothIcon} label="Settings" />
          <MenuItem icon={ArrowRightStartOnRectangleIcon} label="Log out" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex cursor-pointer items-center gap-x-4 p-3"
          >
            <div className="h-5 w-10 overflow-visible rounded-full bg-gray-200 dark:bg-[#5B48A8]">
              <div
                className={classNames(
                  "h-5 w-5 transform rounded-full transition-transform",
                  "bg-gradient-to-r from-[#8CBDF8] to-[#9F54FF] dark:from-[#85BEFA] dark:to-[#B473FE]",
                  isDarkMode ? "translate-x-6" : "",
                )}
              />
            </div>
            <span className="mr-3">
              Switch to {isDarkMode ? "light" : "dark"}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  badge?: number;
  active?: boolean;
}

function MenuItem({ icon: Icon, label, badge, active }: MenuItemProps) {
  const [, setSidebarOpen] = useQueryState(
    "sidebar",
    parseAsBoolean.withDefault(false),
  );

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        setSidebarOpen(false);
      }}
      className={classNames(
        "flex items-center bg-gradient-to-r px-7 py-3",
        active
          ? "from-[#E9F3FE] to-[#DED3FB] dark:from-[#2E4975] dark:to-[#7B42C6]"
          : "hover:from-[#E9F3FE] hover:to-[#DED3FB] hover:dark:from-[#2E4975] hover:dark:to-[#7B42C6]",
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="ml-3">{label}</span>
      {badge && (
        <span
          className={classNames(
            "ml-auto rounded-full px-2 py-0.5 text-xs",
            active
              ? "bg-white/20 text-white"
              : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
          )}
        >
          {badge}
        </span>
      )}
    </a>
  );
}

export default Sidebar;
