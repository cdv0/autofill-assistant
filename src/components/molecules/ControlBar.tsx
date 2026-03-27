import Button from "../atoms/Button";
import { Plus, Pencil, Trash2, CircleX, CircleCheck } from "lucide-react"

interface ControlBarProps {
    mode: "viewing" | "editing" | "editOnly" | "createOnly";
    onCreate?: () => void;
    onSave?: () => void;
    onDelete?: () => void;
    onCancel?: () => void;
    onEdit?: () => void;
}

const ControlBar = ({
    mode,
    onCreate,
    onSave,
    onDelete,
    onCancel,
    onEdit
}: ControlBarProps) => {
  return (
    <div className="flex gap-1">
      {mode === "viewing" && (
        <>
          {onCreate && <Button color="primaryNoFillTextBlack" icon={Plus} name="Create" onClick={onCreate} />}
          {onEdit && <Button color="primaryNoFillTextBlue" icon={Pencil} name="Edit" onClick={onEdit} /> }
          {onDelete && <Button color="dangerNoFill" icon={Trash2} name="Delete" onClick={onDelete} /> }
        </>
      )}

      {mode === "editing" && (
        <>
          {onCancel && <Button color="darkGrayNoFill" icon={CircleX} name="Cancel" onClick={onCancel} />}
          {onSave && <Button color="successNoFill" icon={CircleCheck} name="Save" onClick={onSave} />}
        </>
      )}

      {mode === "editOnly" && onEdit && (
        <Button color="primaryNoFillTextBlue" icon={Pencil} name="Edit" onClick={onEdit} />
      )}

      {mode === "createOnly" && onCreate && (
        <Button color="primaryNoFillTextBlack" icon={Plus} name="Create" onClick={onCreate} />
      )}
    </div>
  );
};

export default ControlBar;