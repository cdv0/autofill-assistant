export interface GroupData {
  group_id: string;
  name: string;
  last_modified: string;
}

export interface GroupField {
  fields_id: string;
  group_id: string;
  label: string;
  value: string;
  position: number;
}