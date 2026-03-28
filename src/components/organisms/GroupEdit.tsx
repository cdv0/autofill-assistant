import Button from "../atoms/Button";
import LabelInput from "../molecules/LabelInput";
import { Plus } from "lucide-react";

export interface GroupEditProps {
  groupName?: string;
  onClickBack?: () => void;
  onClickAddField?: () => void;
  onClickTrash?: () => void;
}

// TODO: Delete dummy data (fields)
const fields = [
  { id: 1, label: "First name", value: "Cathleen" },
  { id: 2, label: "First name", value: "Cathleen" },
  { id: 3, label: "First name", value: "Cathleen" },
  { id: 4, label: "First name", value: "Cathleen" },
  { id: 5, label: "First name", value: "Cathleen" },
  { id: 6, label: "Last name", value: "Vu" },
  { id: 7, label: "First name", value: "Cathleen" },

];

const GroupEdit = ({ groupName, onClickBack, onClickAddField, onClickTrash }: GroupEditProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* TOP BAR */}
      <div className="flex justify-between">
        <h1 className="font-semibold text-lg text-darkGray">Groups {">"} <span className="text-primary">{groupName}</span></h1>
        <Button color="secondaryNoFill" name="Back" onClick={onClickBack}/>
      </div>

      {/* GRID COLUMNS */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        {fields.map((field) => (
          <LabelInput key={field.id} labelText={field.label} placeholder="Type here" type="text" addTrashIcon={true} onClickTrash={onClickTrash} />
        ))}

        {/* ADD NEW FIELD BUTTON */}
        <div className="pt-7">
          <Button color="darkGrayNoFill" name="Add new field" icon={Plus} onClick={onClickAddField}/>
        </div>
      </div>
    </div>
  );
};

export default GroupEdit;