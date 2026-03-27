import { ChevronDown } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const styleClasses = {
    lightBlue: {hover: "hover:bg-lightBlue", text: "text-primary"},
    danger: {hover: "hover:bg-red-100", text: "hover:text-danger"},
    lightGray: {hover: "hover:bg-gray-100", text: "text-primary"},
}

interface NavProps {
    text: string;
    onClick: () => void;
    isDropdown?: boolean;
    icon?: LucideIcon;
    style?: keyof typeof styleClasses;
    className?: string;
    isOpen?: boolean;
}

const NavItem = ({
    text,
    onClick,
    isDropdown = false,
    icon: Icon,
    style = "lightBlue",
    className,
    isOpen,
}: NavProps) => {
    return (
        <button className={`flex justify-between items-center py-2 px-4 w-full rounded-xl ${styleClasses[style].hover} ${styleClasses[style].text} transition ${className}`} onClick={onClick}>
            <div className="flex justify-center items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />}
                <p className={`font-semibold`}>{text}</p>
            </div>
            {isDropdown && <ChevronDown className={`w-4 h-4 ${isOpen? "rotate-180" : "rotate-0"}`}/>}
        </button>
    )
}

export default NavItem;