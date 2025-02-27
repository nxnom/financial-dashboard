import { classNames } from "../../utils/classNames";

interface AvatarProps {
  children: React.ReactNode;
  className?: string;
}

const Avatar = ({ children, className }: AvatarProps) => {
  return (
    <div
      className={classNames(
        "mr-3 flex h-7 w-7 items-center justify-center rounded-full",
        "bg-gradient-to-r from-[#EFF4FE] to-[#EBDBFE] dark:from-[#5362B3] dark:to-[#6E50B5]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Avatar;
