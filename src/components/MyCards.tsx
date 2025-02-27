import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Pagination from "./ui/Pagination";
import { classNames } from "../utils/classNames";

export interface Card {
  type: "visa" | "mastercard";
  number: string;
  expiryDate: string;
  cardholderName: string;
  balance: number;
  color: string;
}

interface MyCardsProps {
  cards: Card[];
}

const MyCards = ({ cards }: MyCardsProps) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const formatCardNumber = (number: string) => {
    return number.match(/.{1,4}/g)?.join(' ') || number;
  };

  const nextCardIndex = (activeCardIndex + 1) % cards.length;

  return (
    <div className="flex flex-col bg-white dark:bg-[#56459E] rounded-2xl p-3 sm:p-4 overflow-hidden h-auto min-h-[260px] sm:min-h-[300px] md:min-h-[270px]">
      <div className="flex justify-between items-center mb-2 sm:mb-4">
        <h3 className="text-base sm:text-lg font-medium">My cards</h3>
        <button className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 flex items-center">
          add card <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
        </button>
      </div>

      <div 
        className="relative flex-1 mb-2 sm:mb-4 cursor-pointer aspect-video"
        onClick={() => setActiveCardIndex(nextCardIndex)}
      >
        <div 
          className={classNames(
            "absolute rounded-xl p-2 sm:p-3 flex flex-col justify-between w-[calc(100%-16px)] sm:w-[calc(100%-20px)] aspect-video z-10 opacity-90 flex flex-col justify-end top-[24px] sm:top-[30px] left-[16px] sm:left-[20px]",
            cards[nextCardIndex].color
          )}
        >
           <div className="text-white">
            <div className="text-xs sm:text-base mb-1 sm:mb-2">{formatCardNumber(cards[activeCardIndex].number)}</div>
            <div className="flex justify-between items-center">
              <div className="text-[10px] sm:text-xs">
                {cards[nextCardIndex].cardholderName}
              </div>
              <div className="text-[10px] sm:text-xs">
                {cards[nextCardIndex].expiryDate}
              </div>
            </div>
          </div>
        </div>

        <div 
          className={classNames(
            "absolute rounded-xl p-3 sm:p-5 flex flex-col justify-between w-[calc(100%-24px)] sm:w-[calc(100%-30px)] aspect-video",
            "transition-all duration-300 shadow-lg",
            cards[activeCardIndex].color
          )}
          style={{
            zIndex: 20,
          }}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs sm:text-sm text-white">Balance</div>
              <div className="text-sm sm:text-lg font-semibold text-white mb-1 sm:mb-2">
                ${cards[activeCardIndex].balance.toLocaleString('en-US', {minimumFractionDigits: 2})}
              </div>
            </div>
            <div className="text-white text-base sm:text-xl font-bold">
              {cards[activeCardIndex].type === "visa" && "VISA"}
              {cards[activeCardIndex].type === "mastercard" && (
               <img src="/mastercard-logo.png" alt="Mastercard" className="w-8 h-5 sm:w-12 sm:h-7 object-contain" />
              )}
            </div>
          </div>
          
          <div className="text-white">
            <div className="text-xs sm:text-sm line-clamp-1">{formatCardNumber(cards[activeCardIndex].number)}</div>
            <div className="flex justify-between items-center">
              <div className="text-[10px] sm:text-xs">
                {cards[activeCardIndex].cardholderName}
              </div>
              <div className="text-[10px] sm:text-xs">
                {cards[activeCardIndex].expiryDate}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 sm:mt-3">
        <Pagination 
          items={cards.map((_, index) => index)}
          activeItem={activeCardIndex}
          onChange={setActiveCardIndex}
        />
      </div>
    </div>
  );
};

export default MyCards;
