import { supabase } from "../lib/supabaseClient";
import { type GroupField } from "../components/organisms/GroupView";

// GROUP FIELDS: Fetch all related group fields
export const fetchRelatedGroupFields = async (group_id: string) => {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    console.log("No user found.");
    return;
  }

  const { data, error } = await supabase
    .from("group_fields")
    .select("*")
    .eq("group_id", group_id)
    .order("position", { ascending: true });

  console.log("group_id passed in:", group_id);
  console.log("Related Group Fields: ", data);
  console.log("Error: ", error);

  return data;
}

// GROUP FIELDS: Insert BULK data
export const insertMultipleFields = async (fields: GroupField[]) => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
        console.log("No user found.");
        return;
    }

    const { data, error } = await supabase
      .from("group_fields")
      .insert(fields)
      .select()

    console.log("Group Field inserted: ", data);
    console.log("Error: ", error)

    return data;
}

// GROUP FIELDS: Insert SINGLE data
export const insertField = async (field: GroupField) => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
        console.log("No user found.");
        return;
    }

    const { data, error } = await supabase
      .from("group_fields")
      .insert(field)
      .select()

    console.log("Group Field inserted: ", data);
    console.log("Error: ", error)

    return data;
}

// GROUP FIELDS: Update fields
export const updateFields = async (fields: GroupField[]) => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
        console.log("No user found.");
        return;
    }

    const updatedResults = [];

    for (const field of fields) {
        const { data, error } = await supabase
          .from("group_fields")
          .update({
            label: field.label,
            value: field.value,
            position: field.position
          })
          .eq("fields_id", field.fields_id)
          .eq("group_id", field.group_id)
          .select();

        console.log("Group Field updated: ", data);
        console.log("Error: ", error);

        updatedResults.push({ data, error });
    }

    return updatedResults;
}

// GROUP FIELDS: Update fields
export const updateSingleField = async (field: GroupField) => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
        console.log("No user found.");
        return;
    }

    const { data, error } = await supabase
        .from("group_fields")
        .update({
            label: field.label,
            value: field.value,
            position: field.position
        })
        .eq("fields_id", field.fields_id)
        .eq("group_id", field.group_id)
        .select();

    console.log("Group Field updated: ", data);
    console.log("Error: ", error);

    return data;
}

// GROUP FIELDS: Delete fields
export const deleteFields = async (fields_ids: string[]) => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
        console.log("No user found.");
        return;
    }

    const { data, error } = await supabase
      .from("group_fields")
      .delete()
      .in("fields_id", fields_ids)
      .select();

    console.log("Group Fields deleted: ", data);
    console.log("Error: ", error);

    return data;
}

// GROUP FIELDS: Delete single field
export const deleteSingleField = async (fields_id: string) => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
        console.log("No user found.");
        return;
    }

    const { data, error } = await supabase
      .from("group_fields")
      .delete()
      .in("fields_id", fields_id)
      .select();

    console.log("Group Fields deleted: ", data);
    console.log("Error: ", error);

    return data;
}