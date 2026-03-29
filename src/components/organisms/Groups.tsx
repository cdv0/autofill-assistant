import Input from "../atoms/TextInput";
import { Search } from "lucide-react"
import GroupRow from "../molecules/GroupRow";
import Button from "../atoms/Button";

export interface GroupsProps {
  onClickRow?: (name: string) => void;
  onClickBack?: () => void;
}

const Groups = ({ onClickRow, onClickBack }: GroupsProps) => {
  // TODO: Delete dummy data
  const dummyGroups = [
    { id: 1, name: "Title1", dateModified: new Date("2026-12-08") },
    { id: 2, name: "Title2", dateModified: new Date("2026-12-08") },
    { id: 3, name: "Title3", dateModified: new Date("2026-12-08") },
    { id: 4, name: "Title4", dateModified: new Date("2026-12-08") },
  ];

  return (
    <div className="flex flex-col rounded-2xl gap-6">
      <div className="flex justify-between">
        <h1 className="font-semibold text-lg text-primary">Groups</h1>
        {/* <Button color="secondaryNoFill" name="Back" onClick={onClickBack}/> */}
      </div>

      <Input type="search" placeholder="Search" icon={Search}/>

      {/* GROUP ROWS AND LABELS */}
      {/* LABELS */}
      <div className="flex justify-between pr-12">
        <p className="text-sm text-primary font-semibold">Group name</p>
        <p className="text-sm text-primary font-semibold">Last modified</p>
      </div>

      {/* ROWS */}
      <div className="flex flex-col">
        {dummyGroups.map((group) => (
          <div key={group.id} className="border-b border-stroke py-3">
            <GroupRow
              name={group.name}
              dateModified={group.dateModified}
              onClick={onClickRow}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Groups;