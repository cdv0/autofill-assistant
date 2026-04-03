import Input, { type InputProps } from "../atoms/TextInput";
import { Trash2 } from "lucide-react";

export interface LabelInputProps extends InputProps {
    labelText: string;
    addTrashIcon?: boolean;
    showPassword?: boolean;
    onClickTrash?: () => void;
    onForgotPassword?: () => void;
}

const LabelInput = ({
    labelText,
    addTrashIcon = false,
    showPassword = false,
    onClickTrash,
    onForgotPassword,
    ...inputProps
}: LabelInputProps) => {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex gap-2 items-center justify-between">
              <p className="font-medium text-base">{labelText}</p>
              {addTrashIcon && 
              <button>
                <Trash2 strokeWidth={1.5} className="w-5 h-5 hover:text-danger" />
              </button>
              }
            </div>
            <Input {...inputProps} />
            {showPassword === true &&
              <div className="flex justify-end">
                <button 
                  className="py-1 w-fit cursor-pointer"
                  onClick={onForgotPassword}
                >
                  <p className="font-medium text-sm text-secondary hover:text-primary">Forgot password?</p>
                </button>
              </div>
            }
        </div>
    )
}

export default LabelInput;