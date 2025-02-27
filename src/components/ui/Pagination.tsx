import { classNames } from "../../utils/classNames";

interface PaginationProps<T> {
  items: T[];
  activeItem: T;
  onChange: (item: T) => void;
}

const Pagination = <T = string | number,>({
  items,
  activeItem,
  onChange,
}: PaginationProps<T>) => {
  return (
    <div className="flex items-center justify-center space-x-1">
      {items.map((item) => (
        <button
          key={String(item)}
          className={classNames(
            "h-2 w-2 cursor-pointer rounded-full transition-colors",
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
