import Logo from "../atoms/Logo.tsx";
import LabelInput from "../molecules/LabelInput.tsx";
import Button from "../atoms/Button.tsx";

export interface AuthFormProps {
  mode: "login" | "signup";
  onClickSubmit: () => void;
  onSwitchMode: () => void;

  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  message: string;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onChangeConfirmPassword: (value: string) => void;

}

const AuthForm = ({ 
  mode,
  email,
  password,
  confirmPassword,
  loading,
  message,
  onChangeEmail,
  onChangePassword,
  onChangeConfirmPassword,
  onClickSubmit,
  onSwitchMode,
 }: AuthFormProps) => {
  const isLogin = mode === "login"

  return (
    <div className="flex flex-col bg-white rounded-2xl px-6 py-8 gap-8 justify-center">
      <Logo size="lg" onClick={() => {}} />

      {/* EMAIL INPUT */}
      <LabelInput 
        labelText="Email" 
        type="text" 
        placeholder="example@gmail.com"
        value={email}
        onChange={(e) => onChangeEmail(e.target.value)}
      />

      {/* PASSWORD INPUT */}
      <LabelInput 
        labelText="Password" 
        type="password" 
        placeholder="Enter password" 
        showPassword={isLogin}
        value={password}
        onChange={(e) => onChangePassword(e.target.value)}
      />

      {/* CONFIRM PASSWORD INPUT */}
      {!isLogin && 
        <LabelInput 
          labelText="Confirm password" 
          type="password" 
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => onChangeConfirmPassword(e.target.value)}
        />}

      {message !== "" && <p className={`text-sm w-full text-center ${loading ? "text-success" : "text-danger"}`}>{message}</p>}

      {/* SUBMIT BUTTON */}
      <div className="flex w-full justify-center">
        <Button 
          name={isLogin? "Log in" : "Sign up"} 
          onClick={onClickSubmit} 
          xPadding="px-8"
        />
      </div>

      {/* SWITCH TO SIGNUP/LOGIN */}
      <div className="flex w-full justify-center items-center">
        <p className="text-secondary font">{isLogin? "Don't have an account? " : "Have an account? "}</p>
        <Button 
          name={isLogin? "Sign up" : "Log in"} 
          color="primaryNoFillTextBlue" 
          onClick={onSwitchMode}
          xPadding="px-1.5"
        />
      </div>
    </div>
  );
};

export default AuthForm;
