import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import LabelInput from "../molecules/LabelInput";
import Button from "../atoms/Button";
import Logo from "../atoms/Logo";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setMessage("");

    if (!password || !confirmPassword) {
      setMessage("Please fill out both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    console.log("Reset data: ", data);
    console.log("Reset error: ", error);

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    await supabase.auth.signOut();

    setPassword("");
    setConfirmPassword("");
    setMessage("Password updated successfully.");
    setLoading(false);

    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-2xl px-6 py-8 flex flex-col gap-8">
        <Logo size="lg" onClick={() => {}} />

        <LabelInput
          labelText="New password"
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <LabelInput
          labelText="Confirm password"
          type="password"
          placeholder="Re-enter new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {message !== "" && (
          <p className="text-sm text-center text-secondary">{message}</p>
        )}

        <div className="flex w-full justify-center items-center">
          <Button
            name={loading ? "Loading..." : "Confirm"}
            color="primaryFill"
            onClick={handleResetPassword}
            xPadding="px-6"
          />
        </div>

        <div className="flex w-full justify-center items-center">
          <Button
            name="Back to login"
            color="primaryNoFillTextBlue"
            onClick={() => navigate("/")}
            xPadding="px-1.5"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;