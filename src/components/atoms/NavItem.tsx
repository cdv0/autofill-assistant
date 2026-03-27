import { ChevronDown } from "lucide-react"

interface NavProps {
    text: string,
    onClick: () => void,
    isDropdown?: boolean
}

const NavItem = ({
    text,
    onClick,
    isDropdown = false
}: NavProps) => {
    return (
        <button className="flex justify-between items-center py-2 px-4 w-full rounded-xl hover:bg-lightBlue transition" onClick={onClick}>
            <p className="font-semibold text-primary">{text}</p>
            {isDropdown && <ChevronDown className="w-4 h-4"/>}
        </button>
    )
}

export default NavItem;