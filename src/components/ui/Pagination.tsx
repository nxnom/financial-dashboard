import { classNames } from "../../utils/classNames";

interface PaginationProps {
  items: string[];
  activeItem: string;
  onChange: (item: string) => void;
}

const Pagination = ({ items, activeItem, onChange }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center space-x-1">
      {items.map((item) => (
        <button
          key={item}
          className={classNames(
            "cursor-pointer w-2 h-2 rounded-full transition-colors",
            activeItem === item
              ? "bg-[#9898EE] dark:bg-[#8F82C9]"
              : "bg-[#DCDCEF] dark:bg-[#3A2E68]",
          )}
          onClick={() => onChange(item)}
          aria-label={`View ${item}`}
        />
      ))}
    </div>
  );
};

export default Pagination;
