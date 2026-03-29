import DashLayout from "../templates/DashLayout";
import { useState } from "react";
import Modal from "../organisms/Modal";

const Dash = () => {
  const [shellMode, setShellMode] = useState<"groups" | "groupView" | "groupEditCreate" | "accountView" | "accountEdit">("groups");
  const [controlMode, setControlMode] = useState<"viewing" | "editing" | "editOnly" | "createOnly">("createOnly");
  const [groupName, setGroupName] = useState<string | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [context, setContext] = useState<"groups" | "account">("groups");
  const [isCreating, setIsCreating] = useState(false);

  return (
    <>
      <DashLayout
        // Logo
        onClickLogo={() => {
          setShellMode("groups");
          setControlMode("createOnly");
        }}

        // Shell
        shellMode={shellMode}
        onClickRow={(name) => {
          setGroupName(name);
          setShellMode("groupView");
          setContext("groups");
        }}
        onClickBack={() => setShellMode("groups")}
        groupName={groupName}
        onClickAddField={() => {}}
        onClickTrash={() => {}} // TODO: add delete trash logic backend
        context={context}

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
          setShellMode("groupEditCreate");
          setControlMode("editing");
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
        onClickLogOut={() => {}} // TODO: Add logic
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