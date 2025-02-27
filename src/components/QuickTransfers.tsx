import { PlusIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Avatar from "./ui/Avatar";

interface Contact {
  id: string;
  name: string;
  accountNumber: string;
}

interface QuickTransfersProps {
  contacts: Contact[];
}

const QuickTransfers = ({ contacts }: QuickTransfersProps) => {
  return (
    <div className="h-auto overflow-hidden rounded-2xl bg-white p-3 shadow-lg shadow-gray-300/50 sm:min-h-[240px] sm:p-4 dark:bg-[#56459E] dark:shadow-black/10">
      <div className="mb-2 flex items-center justify-between sm:mb-4">
        <h3 className="text-base font-medium sm:text-lg">Quick transfers</h3>
        <button className="flex items-center text-xs text-gray-500 sm:text-sm dark:text-gray-300">
          add <PlusIcon className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      </div>

      <div className="space-y-2 sm:space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex cursor-pointer items-center justify-between border-b-[0.5px] border-gray-100 pb-2 last:border-b-0 dark:border-gray-700"
          >
            <div className="flex items-center">
              <Avatar className="h-6 w-6 sm:h-7 sm:w-7">
                <span className="text-xs text-[#A195AD] sm:text-sm">
                  {contact.name[0].toUpperCase()}
                </span>
              </Avatar>
              <div>
                <div className="text-xs font-medium sm:text-sm">
                  {contact.name}
                </div>
                <div className="text-[10px] text-gray-500 sm:text-xs dark:text-gray-400">
                  **** {contact.accountNumber}
                </div>
              </div>
            </div>
            <ChevronRightIcon className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickTransfers;
