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

const Sidebar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

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

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-white dark:bg-[#2D2351]">
      <div className="flex items-center mb-8 px-6 pt-6">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">W</span>
        </div>
        <span className="ml-3 text-xl font-semibold">Wallet</span>
      </div>

      <nav className="space-y-1 text-sm">
        {menuItems.map((item) => (
          <MenuItem key={item.label} {...item} />
        ))}
      </nav>

      <div className="w-full pt-5 mt-5 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <MenuItem icon={Cog6ToothIcon} label="Settings" />
        <MenuItem icon={ArrowRightStartOnRectangleIcon} label="Log out" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6">
        <button
          type="button"
          onClick={toggleDarkMode}
          className="flex items-center p-3 gap-x-4 cursor-pointer"
        >
          <div className="w-10 h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-visible">
            <div
              className={classNames(
                "w-5 h-5 rounded-full transform transition-transform",
                "bg-gradient-to-r from-purple-500 to-pink-500",
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
  );
};

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  badge?: number;
  active?: boolean;
}

function MenuItem({ icon: Icon, label, badge, active }: MenuItemProps) {
  return (
    <a
      href="#"
      className={classNames(
        "flex items-center px-7 py-3 bg-gradient-to-r",
        active
          ? "from-[#E9F3FE] to-[#DED3FB] dark:from-[#2E4975] dark:to-[#7B42C6]"
          : "hover:from-[#E9F3FE] hover:to-[#DED3FB] hover:dark:from-[#2E4975] hover:dark:to-[#7B42C6]",
      )}
    >
      <Icon className="w-5 h-5" />
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
