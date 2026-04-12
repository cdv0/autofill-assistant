import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Confirming...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");

    if (type === "email_change") {
      setMessage("Email updated successfully.");
    } else if (type === "recovery") {
      setMessage("Password updated successfully.");
    } else {
      setMessage("Confirmed.");
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4">
      <div className="bg-white shadow-md rounded-xl px-6 py-5 flex flex-col gap-3 w-fit text-center">
        <p className="font-semibold text-lg text-primary">{message}</p>
        <p className="text-sm text-darkGray">You can now log back in with your updated credentials.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 text-sm font-medium text-secondary hover:text-primary cursor-pointer"
        >
          Back to login
        </button>
      </div>
    </div>
  );
};

export default ConfirmPage;