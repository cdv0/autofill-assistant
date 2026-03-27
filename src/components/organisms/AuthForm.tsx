import Logo from "../atoms/Logo.tsx";
import LabelInput from "../molecules/LabelInput.tsx";
import Button from "../atoms/Button.tsx";

interface AuthFormProps {
  mode: "login" | "signup";
  onClickSubmit: () => void;
  onSwitchMode: () => void;
}

const AuthForm = ({ mode, onClickSubmit, onSwitchMode }: AuthFormProps) => {
  const isLogin = mode === "login"

  return (
    <div className="flex flex-col bg-white rounded-2xl px-6 py-8 max-w-md gap-8 justify-center">
      <Logo size="lg" onClick={() => {}} />

      {/* EMAIL INPUT */}
      <LabelInput labelText="Email" type="text" placeholder="example@gmail.com"/>

      {/* PASSWORD INPUT */}
      <LabelInput labelText="Password" type="password" placeholder="Enter password" showPassword={isLogin}/>

      {/* CONFIRM PASSWORD INPUT */}
      {!isLogin && <LabelInput labelText="Confirm password" type="password" placeholder="Confirm password"/>}

      {/* SUBMIT BUTTON */}
      <div className="flex w-full justify-center">
        <Button name={isLogin? "Log in" : "Sign up"} onClick={onClickSubmit} xPadding="px-8"/>
      </div>

      {/* SWITCH TO SIGNUP/LOGIN */}
      <div className="flex w-full justify-center items-center">
        <p className="text-secondary font">{isLogin? "Don't have an account? " : "Have an account? "}</p>
        <Button name={isLogin? "Sign up" : "Log in"} color="primaryNoFillTextBlue" onClick={onSwitchMode} xPadding="px-1.5"/>
      </div>
    </div>
  );
};

export default AuthForm;
