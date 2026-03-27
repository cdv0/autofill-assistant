import AuthForm, { type AuthFormProps } from "../organisms/AuthForm";
import { useState } from "react";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login")

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-md">
        <AuthForm mode={mode} onClickSubmit={() => {}} onSwitchMode={() => {setMode(prev => prev === "login" ? "signup" : "login")}} />
      </div>
    </div>
  )
}

export default Auth;