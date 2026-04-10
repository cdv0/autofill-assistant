import Input from "../atoms/TextInput";
import { Search } from "lucide-react";
import GroupRow from "../molecules/GroupRow";
import { useMemo, useState } from "react";
import { type GroupData } from "./GroupView";

export interface GroupsProps {
  groups: GroupData[];
  onClickRow: (id: string, name: string) => void;
  onClickBack?: () => void;
}

const Groups = ({ groups, onClickRow }: GroupsProps) => {
  const [search, setSearch] = useState("");

  const filteredGroups = useMemo(() => {
    return [...groups]
      .sort((a, b) => new Date(b.last_modified).getTime() - new Date(a.last_modified).getTime())
      .filter((g) => g.name.toLowerCase().includes(search.toLowerCase()));
  }, [groups, search]);

  return (
    <div className="flex flex-col rounded-2xl gap-6">
      <div className="flex justify-between">
        <h1 className="font-medium text-lg text-primary">Groups</h1>
      </div>

      <Input
        type="search"
        placeholder="Search"
        icon={Search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex justify-between">
        <p className="text-sm text-primary font-semibold">Group name</p>
        <p className="text-sm text-primary font-semibold">Last modified</p>
      </div>

      <div className="flex flex-col">
        {filteredGroups.length === 0 ? (
          <p className="text-sm text-darkGray">No groups found.</p>
        ) : (
          filteredGroups.map((group) => (
            <div key={group.group_id} className="border-b border-stroke py-3">
              <GroupRow
                name={group.name}
                dateModified={new Date(group.last_modified)}
                onClickRow={() => onClickRow?.(group.group_id, group.name)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Groups;