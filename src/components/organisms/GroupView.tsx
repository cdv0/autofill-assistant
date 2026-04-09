import Button from "../atoms/Button";
import LabelView from "../molecules/LabelView";
import Modal from "../organisms/Modal";
import { useEffect, useState } from "react";
import { fetchGroup } from "../../services/groupService"
import { fetchRelatedGroupFields, updateSingleField, deleteSingleField } from "../../services/groupFieldService";

export interface GroupViewProps {
  groupId: string;
  onClickBack?: () => void;
}

export type GroupData = {
  group_id: string;
  name: string;
  last_modified: string;
}

export type GroupField = {
  fields_id: string;
  group_id: string;
  label: string;
  value: string;
  position: number;
}

const GroupView = ({ groupId, onClickBack }: GroupViewProps) => {
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [fields, setFields] = useState<GroupField[]>([]);
  const [editingField, setEditingField] = useState<GroupField | null>(null);
  const [deletingField, setDeletingField] = useState<GroupField | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editValue, setEditValue] = useState("");

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

  const handleEditField = async () => {
    if (!editingField) return;

    const updated = fields.map((field) =>
      field.fields_id === editingField.fields_id
        ? { ...field, label: editLabel, value: editValue }
        : field
    );

    const payload = { ...editingField, label: editLabel, value: editValue };
    console.log("Updating field with payload:", payload);
    const result = await updateSingleField(payload);
    console.log("Update result:", result);
    setFields(updated);
    setEditingField(null);
  };

  const handleDeleteField = async () => {
    if (!deletingField) return;

    await deleteSingleField(deletingField.fields_id);
    setFields((prev) => prev.filter((f) => f.fields_id !== deletingField.fields_id));
    setDeletingField(null);
  };

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
            <LabelView
              key={field.fields_id}
              label={field.label}
              value={field.value}
              onClickEdit={() => {
                setEditingField(field);
                setEditLabel(field.label);
                setEditValue(field.value);
              }}
              onClickDelete={() => setDeletingField(field)}
            />
          ))
        )}
      </div>

      {/* Edit Modal Overlay */}
      {editingField && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <Modal
            variant="edit"
            category="Field"
            labelValue={editLabel}
            onLabelChange={(e) => setEditLabel(e.target.value)}
            valueValue={editValue}
            onValueChange={(e) => setEditValue(e.target.value)}
            onClickCancel={() => setEditingField(null)}
            onClickConfirm={handleEditField}
          />
        </div>
      )}

      {/* Delete Modal Overlay */}
      {deletingField && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <Modal
            variant="delete"
            category="Field"
            id={deletingField.fields_id}
            displayName={deletingField.label}
            onClickCancel={() => setDeletingField(null)}
            onClickConfirm={handleDeleteField}
          />
        </div>
      )}
    </div>
  );
};

export default GroupView;