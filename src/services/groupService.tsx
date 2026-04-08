import { supabase } from "../lib/supabaseClient"

// GROUP: Create group
export const createGroup = async (name: string) => {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    console.log("No user found.");
    return;
  }

  const { data, error } = await supabase
    .from("groups")
    .insert([
      {
        name,
        user_id: userData.user.id
      }
    ])
    .select();

  console.log("Group: ", data);
  console.log("Error: ", error);

  return data;
}

// GROUP: Read all groups
export const fetchAllGroups = async () => {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    console.log("No user found.");
    return;
  }

  const { data, error } = await supabase
    .from("groups")
    .select("group_id,name,last_modified")
    .eq("user_id", userData.user.id)
    .order("name", { ascending: true });
    
  console.log("Groups: ", data);
  console.log("Error: ", error);

  return data;
}

// GROUP: Read single group
export const fetchGroup = async (group_id: string) => {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    console.log("No user found.");
    return;
  }

  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("group_id", group_id)
    .eq("user_id", userData.user.id)
    .single();
    
  console.log("Group: ", data);
  console.log("Error: ", error);

  return data;
}

// GROUP: Update group name
export const updateGroup = async (group_id: string, name: string) => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData.user) {
    console.log("No user found.")
    return
  }

  const { data, error } = await supabase
    .from("groups")
    .update({name})
    .eq("group_id", group_id)
    .eq("user_id", userData.user.id)
    .select();
  
  console.log("Updated Group: ", data)
  console.log("Error: ", error)

  return data;
}

// GROUP: Delete group
export const deleteGroup = async (group_id: string) => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData.user) {
    console.log("No user found.")
    return
  }

  const { data, error } = await supabase
    .from("groups")
    .delete()
    .eq("group_id", group_id)
    .eq("user_id", userData.user.id)
  
  console.log("Group: ", data)
  console.log("Error: ", error)

  return data;
}

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