import { supabase } from "../lib/supabaseClient";

// ACCOUNT: Fetch user
export const fetchUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log("Error:", error);
    return null;
  }

  if (!data.user) {
    console.log("No user found.");
    return null;
  }

  console.log("User:", data.user);
  return data.user;
};

// ACCOUNT: Update email
export const updateUserEmail = async (newEmail: string) => {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    console.log("No user found.");
    return null;
  }

  const { data, error } = await supabase.auth.updateUser(
    {email: newEmail},
    { emailRedirectTo: `${import.meta.env.VITE_WEBSITE_URL}confirm?type=email_change`}
);

  console.log("Updated user:", data);
  console.log("Error:", error);

  return data;
};

// ACCOUNT: Update password
export const updateUserPassword = async (newPassword: string) => {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    console.log("No user found.");
    return null;
  }

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  console.log("Updated user:", data);
  console.log("Error:", error);

  return data;
};