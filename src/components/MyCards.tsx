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
    return number.match(/.{1,4}/g)?.join(" ") || number;
  };

  const nextCardIndex = (activeCardIndex + 1) % cards.length;

  return (
    <div className="flex h-auto min-h-[260px] flex-col overflow-hidden rounded-2xl bg-white p-3 shadow-lg shadow-gray-300/50 sm:min-h-[300px] sm:p-4 md:min-h-[270px] dark:bg-[#56459E] dark:shadow-black/10">
      <div className="mb-2 flex items-center justify-between sm:mb-4">
        <h3 className="text-base font-medium sm:text-lg">My cards</h3>
        <button className="flex items-center text-xs text-gray-500 sm:text-sm dark:text-gray-300">
          add card <PlusIcon className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      </div>

      <div
        className="relative mb-2 aspect-video flex-1 cursor-pointer sm:mb-4"
        onClick={() => setActiveCardIndex(nextCardIndex)}
      >
        <div
          className={classNames(
            "absolute top-[24px] left-[16px] z-10 flex aspect-video w-[calc(100%-16px)] flex-col justify-between justify-end rounded-xl p-2 opacity-90 sm:top-[30px] sm:left-[20px] sm:w-[calc(100%-20px)] sm:p-3",
            cards[nextCardIndex].color,
          )}
        >
          <div className="text-white">
            <div className="mb-1 text-xs sm:mb-2 sm:text-base">
              {formatCardNumber(cards[activeCardIndex].number)}
            </div>
            <div className="flex items-center justify-between">
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
            "absolute flex aspect-video w-[calc(100%-24px)] flex-col justify-between rounded-xl p-3 sm:w-[calc(100%-30px)] sm:p-5",
            "shadow-lg transition-all duration-300",
            cards[activeCardIndex].color,
          )}
          style={{
            zIndex: 20,
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-white sm:text-sm">Balance</div>
              <div className="mb-1 text-sm font-semibold text-white sm:mb-2 sm:text-lg">
                $
                {cards[activeCardIndex].balance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="text-base font-bold text-white sm:text-xl">
              {cards[activeCardIndex].type === "visa" && "VISA"}
              {cards[activeCardIndex].type === "mastercard" && (
                <img
                  src="/mastercard-logo.png"
                  alt="Mastercard"
                  className="h-5 w-8 object-contain sm:h-7 sm:w-12"
                />
              )}
            </div>
          </div>

          <div className="text-white">
            <div className="line-clamp-1 text-xs sm:text-sm">
              {formatCardNumber(cards[activeCardIndex].number)}
            </div>
            <div className="flex items-center justify-between">
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

      <div className="mt-6 flex justify-center sm:mt-3">
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
