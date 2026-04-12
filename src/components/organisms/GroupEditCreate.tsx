import Button from "../atoms/Button";
import LabelInput from "../molecules/LabelInput";
import { Plus } from "lucide-react";
import { fetchGroup } from "../../services/groupService";
import { fetchRelatedGroupFields } from "../../services/groupFieldService";
import { type GroupData, type GroupField } from "../../types/groups";
import { useState, useEffect } from "react";

export interface GroupEditProps {
  groupId: string;
  groupName?: string;
  onGroupNameChange?: (value: string) => void;
  onClickBack: () => void;
  onClickAddField?: () => void;
  onClickTrash?: (fields_id: string) => void;
  onFieldsChange?: (fields: GroupField[]) => void;
  context: "groups" | "account";
}

const GroupEdit = ({
  groupName,
  onClickBack,
  onClickAddField,
  onClickTrash,
  onFieldsChange,
  onGroupNameChange,
  context,
  groupId,
}: GroupEditProps) => {
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [fields, setFields] = useState<GroupField[]>([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const loadGroupDetails = async () => {
      const group = await fetchGroup(groupId);
      const groupFields = await fetchRelatedGroupFields(groupId);

      setGroupData(group ?? null);
      setFields(groupFields ?? []);
    };

    loadGroupDetails();
  }, [groupId]);

  const handleGroupNameChange = (value: string) => {
    setGroupData((prev) => (prev ? { ...prev, name: value } : prev));
    onGroupNameChange?.(value);
  };

  const handleFieldLabelChange = (fields_id: string, value: string) => {
    const updated = fields.map((field) =>
      field.fields_id === fields_id ? { ...field, label: value } : field
    );

    setFields(updated);
    onFieldsChange?.(updated);
  };

  const handleFieldValueChange = (fields_id: string, value: string) => {
    const updated = fields.map((field) =>
      field.fields_id === fields_id ? { ...field, value } : field
    );

    setFields(updated);
    onFieldsChange?.(updated);
  };

  const handleDeleteField = (fields_id: string) => {
    const updated = fields.filter((field) => field.fields_id !== fields_id);

    setFields(updated);
    onFieldsChange?.(updated);
    onClickTrash?.(fields_id);
  };

  const handleAddField = () => {
    const lastField = fields[fields.length - 1];

    if (lastField && lastField.label.trim() === "") {
      setNotification("Fill out the previous label first.");

      setTimeout(() => {
        setNotification("");
      }, 2500);

      return;
    }

    const updated: GroupField[] = [
      ...fields,
      {
        fields_id: crypto.randomUUID(),
        group_id: groupId,
        label: "",
        value: "",
        position: fields.length + 1,
      },
    ];

    setFields(updated);
    onFieldsChange?.(updated);
    onClickAddField?.();
  };

  return (
    <div className="flex flex-col gap-6 relative">
      {notification !== "" && (
        <div className="absolute top-0 right-0 bg-white border border-stroke shadow-md rounded-xl px-4 py-3 z-10">
          <p className="text-sm text-darkGray">{notification}</p>
        </div>
      )}

      <div className="flex justify-between">
        <h1 className="text-lg text-darkGray">
          Groups {">"}{" "}
          <span className="text-primary font-medium">
            {groupName ?? groupData?.name ?? ""}
          </span>
        </h1>
        <Button color="secondaryNoFill" name="Back" onClick={onClickBack} />
      </div>

      {context === "groups" && (
        <div className="pb-8">
          <LabelInput
            labelText="Group name"
            type="text"
            placeholder="Enter group name"
            value={groupName ?? groupData?.name ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleGroupNameChange(e.target.value)
            }
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        {fields.map((field) => (
          <div key={field.fields_id} className="flex flex-col gap-3">
            <LabelInput
              labelText="Label"
              placeholder="Enter label"
              type="text"
              value={field.label}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFieldLabelChange(field.fields_id, e.target.value)
              }
              addTrashIcon={true}
              onClickTrash={() => handleDeleteField(field.fields_id)}
            />

            <LabelInput
              labelText="Value"
              placeholder="Type here"
              type="text"
              value={field.value ?? ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFieldValueChange(field.fields_id, e.target.value)
              }
            />
          </div>
        ))}

        {context === "groups" && (
          <div className="pt-7">
            <Button
              color="darkGrayNoFill"
              name="Add new field"
              icon={Plus}
              onClick={handleAddField}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupEdit;