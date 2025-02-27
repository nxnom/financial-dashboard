import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Pagination from "./ui/Pagination";
import { classNames } from "../utils/classNames";

interface Card {
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
    <div className="bg-white dark:bg-[#56459E] rounded-2xl p-4 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">My cards</h3>
        <button className="text-sm text-gray-500 dark:text-gray-300 flex items-center">
          add card <PlusIcon className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="relative h-50 mb-4 cursor-pointer"
      onClick={() => setActiveCardIndex(nextCardIndex)}
      >
        <div 
          className={classNames(
            "absolute rounded-xl p-5 flex flex-col justify-between w-[calc(100%-30px)] aspect-video z-10 opacity-90 flex flex-col justify-end",
            cards[nextCardIndex].color
          )}
          style={{
            transform: "translateY(30px) translateX(30px) scale(0.97)",
           
          }}
        >
           <div className="text-white">
            <div className="text-base mb-2">{formatCardNumber(cards[activeCardIndex].number)}</div>
            <div className="flex justify-between items-center">
              <div className="text-xs">
                {cards[activeCardIndex].cardholderName}
              </div>
              <div className="text-xs">
                {cards[activeCardIndex].expiryDate}
              </div>
            </div>
          </div>
        </div>

        <div 
          className={classNames(
            "absolute rounded-xl p-5 flex flex-col justify-between w-[calc(100%-30px)] aspect-video",
            "transition-all duration-300 shadow-lg",
            cards[activeCardIndex].color
          )}
          style={{
            zIndex: 20,
          }}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-white mb-1">Balance</div>
              <div className="text-2xl font-semibold text-white">
                ${cards[activeCardIndex].balance.toLocaleString('en-US', {minimumFractionDigits: 2})}
              </div>
            </div>
            <div className="text-white text-xl font-bold">
              {cards[activeCardIndex].type === "visa" && "VISA"}
              {cards[activeCardIndex].type === "mastercard" && (
               <img src="/mastercard-logo.png" alt="Mastercard" width={50} height={30} />
              )}
            </div>
          </div>
          
          <div className="text-white">
            <div className="text-sm mb-1">{formatCardNumber(cards[activeCardIndex].number)}</div>
            <div className="flex justify-between items-center">
              <div className="text-xs">
                {cards[activeCardIndex].cardholderName}
              </div>
              <div className="text-xs">
                {cards[activeCardIndex].expiryDate}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Pagination 
          items={cards.map((_, index) => index.toString())}
          activeItem={activeCardIndex.toString()}
          onChange={(item) => setActiveCardIndex(parseInt(item))}
        />
      </div>
    </div>
  );
};

export default MyCards;