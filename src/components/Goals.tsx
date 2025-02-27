import { PlusIcon } from "@heroicons/react/24/outline";
import { HomeIcon, CameraIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
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
    (activePage + 1) * pageSize
  );

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "trip":
        return <PaperAirplaneIcon className="w-4 h-4 text-[#A195AD]" />;
      case "house":
        return <HomeIcon className="w-4 h-4 text-[#A195AD]" />;
      case "camera":
        return <CameraIcon className="w-4 h-4 text-[#A195AD]" />;
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
    <div className="flex flex-col bg-white dark:bg-[#56459E] rounded-2xl p-4 overflow-hidden h-[240px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Goals</h3>
        <button className="text-sm text-gray-500 dark:text-gray-300 flex items-center">
          add goal <PlusIcon className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {currentGoals.map((goal) => (
          <div key={goal.id} className="flex items-center space-x-3">
            <Avatar>
              {getIcon(goal.icon)}
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-medium text-sm">{goal.name}</span>
                <span className="text-sm">
                  {formatAmount(goal.currentAmount)} / {formatAmount(goal.targetAmount)}
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#60B1FF] to-[#A452FF]"
                  style={{ width: `${calculateProgress(goal.currentAmount, goal.targetAmount)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

<div className="flex-1" />
    <div>
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