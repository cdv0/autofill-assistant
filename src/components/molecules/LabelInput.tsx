import Input, { type InputProps } from "../atoms/TextInput";
import { Trash2 } from "lucide-react";

interface LabelInputProps extends InputProps {
    labelText: string;
    addTrashIcon?: boolean;
}

const LabelInput = ({
    labelText,
    addTrashIcon = false,
    ...inputProps
}: LabelInputProps) => {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex gap-2 items-center justify-between">
              <p className="font-medium text-base">{labelText}</p>
              {addTrashIcon && <Trash2 className="w-5 h-5 hover:text-danger transition" />}
            </div>
            <Input {...inputProps} />
            {inputProps.type === "password" && 
              <div className="flex justify-end">
                <button className="py-1 w-fit">
                  <p className="font-medium text-sm text-secondary hover:text-primary">Forgot password?</p>
                </button>
              </div>
            }
        </div>
    )
}

export default LabelInput;