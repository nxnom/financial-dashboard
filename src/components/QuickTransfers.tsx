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
    <div className="bg-white dark:bg-[#56459E] rounded-2xl p-3 sm:p-4 overflow-hidden h-auto sm:min-h-[240px]">
      <div className="flex justify-between items-center mb-2 sm:mb-4">
        <h3 className="text-base sm:text-lg font-medium">Quick transfers</h3>
        <button className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 flex items-center">
          add <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-2 sm:space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center justify-between cursor-pointer pb-2 border-b-[0.5px] border-gray-100 dark:border-gray-700 last:border-b-0">
            <div className="flex items-center">
              <Avatar className="w-6 h-6 sm:w-7 sm:h-7">
                <span className="text-[#A195AD] text-xs sm:text-sm">{contact.name[0].toUpperCase()}</span>
              </Avatar>
              <div>
                <div className="font-medium text-xs sm:text-sm">{contact.name}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                  **** {contact.accountNumber}
                </div>
              </div>
            </div>
            <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickTransfers;