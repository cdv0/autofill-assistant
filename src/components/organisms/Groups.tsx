import Input from "../atoms/TextInput";
import { Search } from "lucide-react"
import GroupRow from "../molecules/GroupRow";
import { useEffect, useState } from "react";
import { fetchAllGroups } from "../../services/groupService";
import { type GroupData } from "./GroupView";

export interface GroupsProps {
  onClickRow: (id: string) => void;
  onClickBack?: () => void;
}

const Groups = ({ onClickRow, onClickBack }: GroupsProps) => {
  const [groups, setGroups] = useState<GroupData[]>([]);

  useEffect(() => {
    const loadGroups = async () => {
      const data = await fetchAllGroups();
      console.log(data);
      setGroups(data ?? []);
    };

    loadGroups();
  }, []);

  return (
    <div className="flex flex-col rounded-2xl gap-6">
      <div className="flex justify-between">
        <h1 className="font-medium text-lg text-primary">Groups</h1>
        {/* <Button color="secondaryNoFill" name="Back" onClick={onClickBack}/> */}
      </div>

      <Input type="search" placeholder="Search" icon={Search}/>

      {/* GROUP ROWS AND LABELS */}
      {/* LABELS */}
      <div className="flex justify-between">
        <p className="text-sm text-primary font-semibold">Group name</p>
        <p className="text-sm text-primary font-semibold">Last modified</p>
      </div>

      {/* ROWS */}
      <div className="flex flex-col">
        {groups.map((group) => (
          <div key={group.group_id} className="border-b border-stroke py-3">
            <GroupRow
              name={group.name}
              dateModified={new Date(group.last_modified)}
              onClickRow={() => onClickRow?.(group.group_id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Groups;