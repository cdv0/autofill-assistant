import Button from "../atoms/Button";
import LabelView from "../molecules/LabelView";

interface GroupViewProps {
  groupName: string;
  onClickBack: () => void;
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
  { id: 8, label: "First name", value: "Cathleen" },
];

const GroupView = ({ groupName, onClickBack }: GroupViewProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <h1 className="font-semibold text-lg text-darkGray">Groups {">"} <span className="text-primary">{groupName}</span></h1>
        <Button color="secondaryNoFill" name="Back" onClick={onClickBack}/>
      </div>

      {/* COLUMNS */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        {fields.map((field) => (
          <LabelView label={field.label} value={field.value}/>
        ))}
      </div>
    </div>
  );
};

export default GroupView;