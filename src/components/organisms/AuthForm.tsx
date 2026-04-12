import Logo from "../atoms/Logo";
import LabelInput from "../molecules/LabelInput";
import Button from "../atoms/Button";

export interface AuthFormProps {
  mode: "login" | "signup" | "forgotPassword" | "resetPassword";
  onClickSubmit: () => void;
  onSwitchMode: () => void;
  onForgotPassword?: () => void;
  onClickCancelForgotPassword?: () => void;

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
  onForgotPassword,
  onClickCancelForgotPassword,
}: AuthFormProps) => {
  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isForgotPassword = mode === "forgotPassword";

  return (
    <div className="flex flex-col bg-white rounded-2xl px-6 py-8 gap-8 justify-center">
      <Logo size="lg" onClickLogo={() => {}} />

      <LabelInput
        labelText="Email"
        type="text"
        placeholder="example@gmail.com"
        value={email}
        onChange={(e) => onChangeEmail(e.target.value)}
      />

      {!isForgotPassword && (
        <LabelInput
          labelText="Password"
          type="password"
          placeholder="Enter password"
          showPassword={isLogin}
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
          onForgotPassword={onForgotPassword}
        />
      )}

      {isSignup && (
        <LabelInput
          labelText="Confirm password"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => onChangeConfirmPassword(e.target.value)}
        />
      )}

      {message !== "" && (
        <p className={`text-sm w-full text-center ${isForgotPassword ? "text-secondary" : "text-danger"}`}>{message}</p>
      )}

      <div className="flex w-full justify-center">
        <Button
          name={
            loading
              ? "Loading..."
              : isForgotPassword
              ? "Send reset email"
              : isLogin
              ? "Log in"
              : "Sign up"
          }
          onClick={onClickSubmit}
          xPadding="px-8"
        />
      </div>

      {!isForgotPassword ? (
        <div className="flex w-full justify-center items-center">
          <p className="text-secondary">
            {isLogin ? "Don't have an account? " : "Have an account? "}
          </p>
          <Button
            name={isLogin ? "Sign up" : "Log in"}
            color="primaryNoFillTextBlue"
            onClick={onSwitchMode}
            xPadding="px-1.5"
          />
        </div>
      ) : (
        <div className="flex w-full justify-center items-center">
          <Button
            name="Back to login"
            color="primaryNoFillTextBlue"
            onClick={onClickCancelForgotPassword ?? (() => {})}
            xPadding="px-1.5"
          />
        </div>
      )}
    </div>
  );
};

export default AuthForm;