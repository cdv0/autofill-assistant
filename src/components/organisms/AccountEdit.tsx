import Button from "../atoms/Button";
import LabelInput from "../molecules/LabelInput";

export interface AccountEditProps {
}

// TODO: Delete dummy data (fields)
const fields = [
  { id: 1, label: "First name", value: "Cathleen", placeholder: "example@gmail.com" },
  { id: 2, label: "First name", value: "Cathleen", placeholder: "*****" },

];

const AccountEdit = ({  }: AccountEditProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* TOP BAR */}
      <div className="flex justify-between">
        <h1 className="font-semibold text-lg text-primary">Account</h1>
      </div>

      {/* GRID COLUMNS */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        {fields.map((field) => (
          <LabelInput key={field.id} labelText={field.label} placeholder={field.placeholder} type="text" />
        ))}

      </div>
    </div>
  );
};

export default AccountEdit;