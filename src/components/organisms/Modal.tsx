import { Plus } from "lucide-react";
import Button from "../atoms/Button";
import LabelInput from "../molecules/LabelInput";
import type { LucideIcon } from "lucide-react";

interface DeleteVariant {
  variant: "delete";
  id: string;
  displayName: string;
  category: string;
}

interface FormVariant {
  variant: "create" | "edit";
  category: string;
  inputLabel?: string;
  inputPlaceholder?: string;
  inputIcon?: LucideIcon;
  inputValue?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type ModalProps = (DeleteVariant | FormVariant) & {
  onClickCancel: () => void;
  onClickConfirm: () => void;
};

const Modal = (props: ModalProps) => {
  const { onClickCancel, onClickConfirm } = props;

  const title =
    props.variant === "delete"
      ? `Delete this ${props.category.toLowerCase()}?`
      : props.variant === "edit"
      ? `Edit ${props.category.toLowerCase()}`
      : `Create ${props.category.toLowerCase()}`;

  const confirmButton =
    props.variant === "delete" ? (
      <Button name="Delete" color="dangerFill" onClick={onClickConfirm} />
    ) : (
      <Button
        name={props.variant === "edit" ? "Save" : "Create"}
        color="primaryFill"
        icon={props.variant === "create" ? Plus : undefined}
        onClick={onClickConfirm}
        disabled={!props.inputValue?.trim()}
      />
    );

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-stroke py-4 px-6 w-full max-w-md gap-3">
      <h1 className="font-semibold text-lg">{title}</h1>

      {props.variant === "delete" ? (
        <p>
          {props.category}{" "}
          <span className="text-secondary font-semibold">{props.displayName}</span>{" "}
          will be removed permanently. Are you sure you want to continue?
        </p>
      ) : (
        <LabelInput
          type="text"
          labelText={props.inputLabel ?? `${props.category} name`}
          placeholder={props.inputPlaceholder ?? `Enter ${props.category.toLowerCase()} name`}
          icon={props.inputIcon}
          value={props.inputValue}
          onChange={props.onInputChange}
        />
      )}

      <div className="flex flex-row justify-end gap-4">
        <Button name="Cancel" color="darkGrayNoFill" onClick={onClickCancel} />
        {confirmButton}
      </div>
    </div>
  );
};

export default Modal;