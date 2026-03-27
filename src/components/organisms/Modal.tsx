import Button from "../atoms/Button";

interface ModalProps {
  name: string;  // Specific name ex. Group Health
  category: string, // Ex. Group, Input, etc.
  onClickCancel: () => void;
  onClickDelete: () => void;
}

const Modal = ({
  name,
  category,
  onClickCancel,
  onClickDelete
}: ModalProps) => {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-stroke py-4 px-6 max-w-md gap-1">
      <h1 className="font-semibold text-lg">Delete this {category.toLowerCase()}?</h1>
      <p>{category} <span className="text-secondary font-semibold">{name}</span> will be removed permanently. Are you sure you want to continue?</p>

      <div className="flex flex-row justify-end gap-4">
        <Button name="Cancel" color="darkGrayNoFill" onClick={onClickCancel}/>
        <Button name="Delete" color="dangerFill" onClick={onClickDelete}/>
      </div>
    </div>
  )
}

export default Modal;