import LabelView from "../molecules/LabelView";

export interface AccountViewProps {
}

// TODO: Delete dummy data (fields)
const fields = [
  { id: 1, label: "Email", value: "example@gmail.com" },
  { id: 2, label: "Password", value: "*******" },
];

const AccountView = ({ }: AccountViewProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <h1 className="font-semibold text-lg text-primary">Account</h1>
      </div>

      {/* COLUMNS */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        {fields.map((field) => (
          <LabelView key={field.id} label={field.label} value={field.value}/>
        ))}
      </div>
    </div>
  );
};

export default AccountView;