import Button from "../atoms/Button";
import { Plus, Pencil, Trash2, CircleX, CircleCheck } from "lucide-react"

export interface ControlBarProps {
    controlMode: "viewing" | "editing" | "editOnly" | "createOnly";
    onCreate?: () => void;
    onSave?: () => void;
    onDelete?: () => void;
    onCancel?: () => void;
    onEdit?: () => void;
}

const ControlBar = ({
    controlMode,
    onCreate,
    onSave,
    onDelete,
    onCancel,
    onEdit
}: ControlBarProps) => {
  return (
    <div className="flex bg-white gap-1 rounded-2xl border border-stroke py-1.5">
      {controlMode === "viewing" && (
        <>
          {onCreate && <Button color="primaryNoFillTextBlack" icon={Plus} name="Create" onClick={onCreate} />}
          {onEdit && <Button color="primaryNoFillTextBlue" icon={Pencil} name="Edit" onClick={onEdit} /> }
          {onDelete && <Button color="dangerNoFill" icon={Trash2} name="Delete" onClick={onDelete} /> }
        </>
      )}

      {controlMode === "editing" && (
        <>
          {onCancel && <Button color="darkGrayNoFill" icon={CircleX} name="Cancel" onClick={onCancel} />}
          {onSave && <Button color="successNoFill" icon={CircleCheck} name="Save" onClick={onSave} />}
        </>
      )}

      {controlMode === "editOnly" && onEdit && (
        <Button color="primaryNoFillTextBlue" icon={Pencil} name="Edit" onClick={onEdit} />
      )}

      {controlMode === "createOnly" && onCreate && (
        <Button color="primaryNoFillTextBlack" icon={Plus} name="Create" onClick={onCreate} />
      )}
    </div>
  );
};

export default ControlBar;