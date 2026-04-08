import Button from "../atoms/Button";
import LabelView from "../molecules/LabelView";
import { useEffect, useState } from "react";
import { fetchGroup, fetchRelatedGroupFields } from "../../services/groupService";

export interface GroupViewProps {
  groupId: string;
  onClickBack?: () => void;
}

type GroupData = {
  group_id: string;
  name: string;
  last_modified: string;
}

type GroupField = {
  fields_id: string;
  group_id: string;
  label: string;
  value: string;
  position: number;
}

const GroupView = ({ groupId, onClickBack }: GroupViewProps) => {
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [fields, setFields] = useState<GroupField[]>([]);

  useEffect(() => {
    const loadGroupDetails = async () => {
      if (!groupId) return;

      const group = await fetchGroup(groupId);
      const groupFields = await fetchRelatedGroupFields(groupId);

      console.log("group:", group);
      console.log("groupFields:", groupFields);

      setGroupData(group ?? null);
      setFields(groupFields ?? []);
    };

    loadGroupDetails();
  }, [groupId]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <h1 className="text-lg text-darkGray">Groups  {" > "} <span className="text-primary font-medium"> {groupData?.name ?? ""}</span></h1>
        <Button color="secondaryNoFill" name="Back" onClick={onClickBack}/>
      </div>

      {/* COLUMNS */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        {fields.length === 0 ? (
          <p className="text-darkGray text-sm">No fields found</p>
        ) : (
          fields.map((field) => (
            <LabelView key={field.fields_id} label={field.label} value={field.value}/>
          ))
        )}
      </div>
    </div>
  );
};

export default GroupView;