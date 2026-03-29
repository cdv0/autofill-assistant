import type { LucideIcon } from "lucide-react";

export interface InputProps {
    type: "search" | "text" | "password";
    placeholder: string;
    icon?: LucideIcon;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
    type = "text",
    placeholder,
    icon: Icon,
    value,
    onChange,
}: InputProps) => {
    return (
        <div className="flex items-center gap-2 border border-stroke hover:border-darkGray px-3 py-2 rounded-xl">
            {Icon && <Icon className="w-4 h-4 text-darkStroke"/>}
            
            <input type={type} placeholder={placeholder} className="outline-none w-full" value={value} onChange={onChange} />
        </div>
    )
}

export default Input;