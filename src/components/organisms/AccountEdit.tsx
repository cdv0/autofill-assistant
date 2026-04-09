import { useEffect } from "react";
import LabelInput from "../molecules/LabelInput";
import { fetchUser } from "../../services/accountService";

export interface AccountEditProps {
  email: string;
  password: string;
  onEmailChange: (val: string) => void;
  onPasswordChange: (val: string) => void;
}

const AccountEdit = ({ email, password, onEmailChange, onPasswordChange }: AccountEditProps) => {
  useEffect(() => {
    const loadUser = async () => {
      const user = await fetchUser();
      if (user?.email) onEmailChange(user.email);
    };
    loadUser();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <h1 className="font-semibold text-lg text-primary">Account</h1>
      </div>

      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        <LabelInput
          labelText="Email"
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
        <LabelInput
          labelText="Password"
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          showPassword={false}
        />
      </div>
    </div>
  );
};

export default AccountEdit;