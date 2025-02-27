import { PlusIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { classNames } from "../utils/classNames";

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
    <div className="bg-white dark:bg-[#56459E] rounded-2xl p-4 overflow-hidden h-[244px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Quick transfers</h3>
        <button className="text-sm text-gray-500 dark:text-gray-300 flex items-center">
          add <PlusIcon className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center justify-between cursor-pointer pb-2 border-b-[0.5px] border-gray-100 dark:border-gray-700 last:border-b-0">
            <div className="flex items-center">
              <div
                className={classNames(
                  "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                  "bg-gray-100 dark:bg-[#473D7B] text-gray-500 dark:text-gray-300"
                )}
              >
                <span>{contact.name[0].toUpperCase()}</span>
              </div>
              <div>
                <div className="font-medium text-sm">{contact.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  **** {contact.accountNumber}
                </div>
              </div>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickTransfers;