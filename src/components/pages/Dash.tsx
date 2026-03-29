import DashLayout from "../templates/DashLayout";
import { useState } from "react";

const Dash = () => {
  const [shellMode, setShellMode] = useState<"groups" | "groupView" | "groupEditCreate" | "accountView" | "accountEdit">("groups");
  const [controlMode, setControlMode] = useState<"viewing" | "editing" | "editOnly" | "createOnly">("viewing");
  const [groupName, setGroupName] = useState<string | undefined>(undefined); // Set group name for the breadcrumbs

  return (
    <DashLayout
      // Shell
      shellMode={shellMode}
      onClickRow={(name) => {
        setGroupName(name);
        setShellMode("groupView");
      }}
      onClickBack={() => setShellMode("groups")}
      groupName={groupName}
      onClickAddField={() => {}}
      onClickTrash={() => {}}

      // ControlBar
      controlMode={controlMode}
      onCreate={() => {
        setShellMode("groupEditCreate");
        setControlMode("creating");
      }}
      onEdit={() => setControlMode("editing")}
      onSave={() => setControlMode("viewing")}
      onDelete={() => {}}
      onCancel={() => setControlMode("viewing")}

      // NavBar
      onClickAccount={() => setShellMode("accountView")}
      onClickLogOut={() => {}}
    />
  );
};

export default Dash;
