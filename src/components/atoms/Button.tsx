const colorClasses = {
  primaryFill: "bg-primary text-white",
  dangerFill: "bg-danger text-white",
  primaryNoFill: "bg-transparent text-primary",
  darkGrayNoFill: "bg-transparent text-darkGray",
  dangerNoFill: "bg-transparent text-danger",
  secondaryNoFill: "bg-transparent text-secondary",
  successNoFill: "bg-transparent text-success",
}

interface ButtonProps {
    name: string
    onClick: () => void
    type?: "button" | "submit" | "reset"
    color?: keyof typeof colorClasses // Same as color?: "primaryFill" | "dangerFill" | ...
}

const Button = ({ name, onClick, type="button", color="primaryFill"}: ButtonProps) => {
    return (
        <button 
          className={`btn flex flex-row justify-center items-center min-w-min py-2.5 px-5 ${colorClasses[color]} rounded-xl text-sm font-medium`}
          type={type} 
          onClick={onClick}
        >
          {name}
        </button>
    )
}

export default Button;