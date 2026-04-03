import DashLayout from "../templates/DashLayout";
import { useEffect, useState } from "react";
import Modal from "../organisms/Modal";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const Dash = () => {
  const navigate = useNavigate();

  const [shellMode, setShellMode] = useState<"groups" | "groupView" | "groupEditCreate" | "accountView" | "accountEdit">("groups");
  const [controlMode, setControlMode] = useState<"viewing" | "editing" | "editOnly" | "createOnly">("createOnly");
  const [groupName, setGroupName] = useState<string | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [context, setContext] = useState<"groups" | "account">("groups");
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        navigate("/");
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <DashLayout
        // Logo
        onClickLogo={() => {
          setShellMode("groups");
          setControlMode("createOnly");
          setContext("groups");
        }}

        // Shell
        shellMode={shellMode}
        onClickRow={(name) => {
          setGroupName(name);
          setShellMode("groupView");
          setControlMode("viewing");
          setContext("groups");
        }}
        onClickBack={() => {
          setShellMode("groups");
          setControlMode("createOnly");
          setContext("groups");
        }}
        groupName={groupName}
        onClickAddField={() => {}}
        onClickTrash={() => {}} // TODO: add delete trash logic backend

        // ControlBar
        controlMode={controlMode}
        onDelete={() => setShowModal(true)}
        onCreate={() => {
          setShellMode("groupEditCreate");
          setControlMode("editing");
          setContext("groups");
          setIsCreating(true);
        }}
        onEdit={() => {
          if (context === "account") {
            setShellMode("accountEdit");
            setControlMode("editing");
          } else {
            setShellMode("groupEditCreate");
            setControlMode("editing");
          }
          setIsCreating(false);
        }}
        onSave={() => {
          if (context === "account") {
            setShellMode("accountView");
            setControlMode("editOnly");
          } else {
            setShellMode("groupView");
            setControlMode("viewing");
          }
        }} // TODO: Add logic
        onCancel={() => {
          if (context === "account") {
            setShellMode("accountView");
            setControlMode("editOnly");
          } else {
            setShellMode(isCreating ? "groups" : "groupView");
            setControlMode(isCreating ? "createOnly" : "viewing");
          }
        }}

        // NavBar
        onClickAccount={() => {
          setShellMode("accountView");
          setControlMode("editOnly");
          setContext("account");
        }}
        onClickLogOut={async () => {
          await supabase.auth.signOut();
          navigate("/");
        }}
      />


      {/* Modal Overlay */}
      {showModal && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <Modal
              name={groupName ?? ""}
              category="Group"
              onClickCancel={() => setShowModal(false)}
              onClickDelete={() => { // TODO: Add delete logic backend
                setShowModal(false);
                setShellMode("groups");
                setControlMode("createOnly");
                setContext("groups");
              }}
            />
          </div>
      )}
    </>
  );
};

export default Dash;