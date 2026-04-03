import AuthForm, { type AuthFormProps } from "../organisms/AuthForm";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  // States 
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Login message state
  
  const navigate = useNavigate();

  // Helper functions
  const handleSubmit = async () => {
    setMessage("");

    if (!email || !password) {
      setMessage("Please fill out your email and password.");
      return;
    }

    // Email is empty
    if (!email) {
      setMessage("Please fill out your email.");
      return;
    }

    if (!password) {
      setMessage("Please fill out your password.");
      return;
    }

    // Sign up: Passwords don't match
    if (mode === "signup" && password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Start handling submit
    setLoading(true);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        });

        if (error) {
          throw error
        } else {
          navigate("/dash");
        }

        console.log("Sign up data: ", data)
        setMessage("Confirmation sent to email")

      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          throw error
        } else {
          navigate("/dash");
        }
        
        console.log("Sign in data: ", data)
        setMessage("Sign in successful")
      }
    } catch (err: any) {
      console.log("Error message: ", err)
      setMessage("Something went wrong. Try again.")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-md">
        <AuthForm 
          mode={mode} 
          onClickSubmit={handleSubmit} 
          onSwitchMode={() => {
            setMode(prev => prev === "login" ? "signup" : "login");
            setMessage("");
          }}

          email={email}
          password={password}
          confirmPassword={confirmPassword}
          loading={loading}
          message={message}
          onChangeEmail={setEmail}
          onChangePassword={setPassword}
          onChangeConfirmPassword={setConfirmPassword}
        />
      </div>
    </div>
  )
}

export default Auth;