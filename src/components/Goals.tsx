import { PlusIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon,
  CameraIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import Pagination from "./ui/Pagination";
import { useState } from "react";
import Avatar from "./ui/Avatar";

export interface Goal {
  id: string;
  name: string;
  icon: "trip" | "house" | "camera";
  currentAmount: number;
  targetAmount: number;
}

interface GoalsProps {
  goals: Goal[];
}

const Goals = ({ goals }: GoalsProps) => {
  const [activePage, setActivePage] = useState(0);
  const pageSize = 3;
  const totalPages = Math.ceil(goals.length / pageSize);
  const pageItems = Array.from({ length: totalPages }, (_, i) => i);

  const currentGoals = goals.slice(
    activePage * pageSize,
    (activePage + 1) * pageSize,
  );

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "trip":
        return (
          <PaperAirplaneIcon className="h-3 w-3 text-[#A195AD] sm:h-4 sm:w-4" />
        );
      case "house":
        return <HomeIcon className="h-3 w-3 text-[#A195AD] sm:h-4 sm:w-4" />;
      case "camera":
        return <CameraIcon className="h-3 w-3 text-[#A195AD] sm:h-4 sm:w-4" />;
      default:
        return null;
    }
  };

  const formatAmount = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(100, Math.round((current / target) * 100));
  };

  return (
    <div className="flex h-auto flex-col overflow-hidden rounded-2xl bg-white p-3 shadow-lg shadow-gray-300/50 sm:min-h-[240px] sm:p-4 dark:bg-[#56459E] dark:shadow-black/10">
      <div className="mb-2 flex items-center justify-between sm:mb-4">
        <h3 className="text-base font-medium sm:text-lg">Goals</h3>
        <button className="flex items-center text-xs text-gray-500 sm:text-sm dark:text-gray-300">
          add goal <PlusIcon className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      </div>

      <div className="space-y-2 sm:space-y-4">
        {currentGoals.map((goal) => (
          <div
            key={goal.id}
            className="flex items-center space-x-2 sm:space-x-3"
          >
            <Avatar className="h-6 w-6 sm:h-7 sm:w-7">
              {getIcon(goal.icon)}
            </Avatar>
            <div className="flex-1">
              <div className="mb-1 flex justify-between">
                <span className="text-xs font-medium sm:text-sm">
                  {goal.name}
                </span>
                <span className="text-[10px] sm:text-xs">
                  {formatAmount(goal.currentAmount)} /{" "}
                  {formatAmount(goal.targetAmount)}
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-gray-100 sm:h-1.5 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#60B1FF] to-[#A452FF]"
                  style={{
                    width: `${calculateProgress(goal.currentAmount, goal.targetAmount)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1" />
      <div className="mt-6 flex justify-center sm:mt-3">
        <Pagination
          items={pageItems}
          activeItem={activePage}
          onChange={setActivePage}
        />
      </div>
    </div>
  );
};

export default Goals;
