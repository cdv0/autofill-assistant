import Input from "../atoms/TextInput";
import { Search } from "lucide-react"
import GroupRow from "../molecules/GroupRow";
import { useEffect, useState } from "react";
import { fetchAllGroups } from "../../services/groupService";

export interface GroupsProps {
  onClickRow?: (name: string) => void;
  onClickBack?: () => void;
}

type Group = {
  group_id: string;
  name: string;
  last_modified: string;
}

const Groups = ({ onClickRow, onClickBack }: GroupsProps) => {
  const [groups, setGroups] = useState<Group[]>([]);

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
        <h1 className="font-semibold text-lg text-primary">Groups</h1>
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
              onClick={onClickRow}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Groups;