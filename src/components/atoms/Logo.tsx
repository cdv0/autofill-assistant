const sizeClasses = {
    sm: { img: "h-10 w-10", text: "text-lg"},
    md: { img: "h-12 w-12", text: "text-xl"},
    lg: { img: "h-14 w-14", text: "text-2xl"},
}

export interface LogoProps {
    size?: "sm" | "md" | "lg";
    onClickLogo?: () => void;
    text?: boolean;
    iconOnly?: boolean;
}

const Logo = ({
    size = "md",
    onClickLogo,
    text = true,
    iconOnly = false
}: LogoProps) => {
    return (
        <button onClick={onClickLogo} className="flex justify-center items-center gap-2 p-2 cursor-pointer">
            <img src="../src/assets/logo-image.svg" className={sizeClasses[size].img} />
            {!iconOnly && text && <p className={`font-istok font-bold ${sizeClasses[size].text}`}>Auto Fill AI</p>}
        </button>
    )
}

export default Logo;