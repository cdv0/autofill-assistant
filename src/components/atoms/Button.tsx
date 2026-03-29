import type { LucideIcon } from "lucide-react";

const colorClasses = {
  // FILLED
  primaryFill: "bg-[#2c3e5e] text-white hover:bg-[#354b70]",
  dangerFill: "bg-danger text-white hover:bg-[#d11f21]",

  // NO FILL (underline on hover)
  primaryNoFillTextBlack:
    "bg-transparent text-black hover:underline hover:underline-offset-5 hover:decoration-1",
  
  primaryNoFillTextBlue:
    "bg-transparent text-primary hover:underline hover:underline-offset-5 hover:decoration-1",

  darkGrayNoFill:
    "bg-transparent text-darkGray hover:underline hover:underline-offset-5 hover:decoration-1",

  dangerNoFill:
    "bg-transparent text-danger hover:underline hover:underline-offset-5 hover:decoration-1",

  secondaryNoFill:
    "bg-transparent text-secondary hover:underline hover:underline-offset-5 hover:decoration-1",

  successNoFill:
    "bg-transparent text-success hover:underline hover:underline-offset-5 hover:decoration-1",
};

interface ButtonProps {
  name: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  color?: keyof typeof colorClasses; // Same as color?: "primaryFill" | "dangerFill" | ...
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  strokeWidth?: number;
  xPadding?: string;
}

const Button = ({
  name,
  onClick,
  type = "button",
  color = "primaryFill",
  icon: Icon,
  iconPosition = "left",
  strokeWidth = 2,
  xPadding = "px-5"
}: ButtonProps) => {
  return (
    <button
      className={`btn flex flex-row justify-center items-center gap-2 min-w-min ${xPadding} py-2.5 ${colorClasses[color]} rounded-xl text-sm font-medium w-fit cursor-pointer`}
      type={type}
      onClick={onClick}
    >
      {Icon && iconPosition === "left" && <Icon className="w-4 h-5" strokeWidth={strokeWidth} />}

      {name}

      {Icon && iconPosition === "right" && <Icon className="w-4 h-4" />}
    </button>
  );
};

export default Button;