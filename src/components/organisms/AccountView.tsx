import { useState, useEffect } from "react";
import LabelView from "../molecules/LabelView";
import { fetchUser } from "../../services/accountService";

export interface AccountViewProps {
  email?: string;
  password?: string;
  accountNotification?: string;
}

const AccountView = ({ accountNotification }: AccountViewProps) => {
  const [email, setEmail] = useState<string>("");
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = await fetchUser();
      if (user?.email) setEmail(user.email);
      if (user?.new_email) setPendingEmail(user.new_email);
    };
    loadUser();
  }, []);

  const fields = [
    { id: 1, label: "Email", value: email || "—" },
    { id: 2, label: "Password", value: "••••••••" },
  ];

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex justify-between">
        <h1 className="font-semibold text-lg text-primary">Account</h1>
      </div>

      {/* Top-right notification */}
      {(accountNotification || pendingEmail) && (
        <div className="absolute top-0 right-0 bg-white border border-stroke shadow-md rounded-xl px-4 py-3 z-10">
          <p className="text-sm text-darkGray">
            {accountNotification ?? `Confirm new email: ${pendingEmail}`}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        {fields.map((field) => (
          <LabelView key={field.id} label={field.label} value={field.value} />
        ))}
      </div>
    </div>
  );
};

export default AccountView;