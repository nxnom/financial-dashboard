import { classNames } from "../../utils/classNames"

interface AvatarProps {
    children: React.ReactNode
    className?: string
}

const Avatar = ({ children, className }: AvatarProps) => {
    return <div
        className={classNames(
            "w-8 h-8 rounded-full flex items-center justify-center mr-3",
            "bg-gradient-to-r from-[#EFF4FE] to-[#EBDBFE] dark:from-[#5362B3] dark:to-[#6E50B5]",
            className,
        )}
    >
        {children}
    </div>
}

export default Avatar