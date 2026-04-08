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
  const [groupId, setGroupId] = useState<string | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [context, setContext] = useState<"groups" | "account">("groups");
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  const goToGroups = () => {
    setShellMode("groups");
    setControlMode("createOnly");
    setContext("groups");
    setIsCreating(false);
  };

  const goToGroupView = (name?: string) => {
    setGroupName(name);
    setShellMode("groupView");
    setControlMode("viewing");
    setContext("groups");
    setIsCreating(false);
  };

  const goToGroupCreate = () => {
    setShellMode("groupEditCreate");
    setControlMode("editing");
    setContext("groups");
    setIsCreating(true);
  };

  const goToGroupEdit = () => {
    setShellMode("groupEditCreate");
    setControlMode("editing");
    setContext("groups");
    setIsCreating(false);
  };

  const goToAccountView = () => {
    setShellMode("accountView");
    setControlMode("editOnly");
    setContext("account");
    setIsCreating(false);
  };

  const goToAccountEdit = () => {
    setShellMode("accountEdit");
    setControlMode("editing");
    setContext("account");
    setIsCreating(false);
  };

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
        onClickLogo={goToGroups}

        // Shell
        context={context}
        shellMode={shellMode}
        onClickRow={(id) => {
          setGroupId(id);
          goToGroupView(id);
        }}
        onClickBack={goToGroups}
        groupName={groupName}
        groupId={groupId}
        onClickAddField={() => {}}
        onClickTrash={() => {}} // TODO: add delete trash logic backend

        // ControlBar
        controlMode={controlMode}
        onDelete={() => setShowModal(true)}
        onCreate={goToGroupCreate}
        onEdit={() => {
          if (context === "account") {
            goToAccountEdit();
          } else {
            goToGroupEdit();
          }
        }}
        onSave={() => {
          if (context === "account") {
            goToAccountView();
          } else {
            goToGroupView(groupName);
          }
        }} // TODO: Add logic
        onCancel={() => {
          if (context === "account") {
            goToAccountView();
          } else {
            if (isCreating) {
              goToGroups();
            } else {
              goToGroupView(groupName);
            }
          }
        }}

        // NavBar
        onClickAccount={goToAccountView}
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
              goToGroups();
            }}
          />
        </div>
      )}
    </>
  );
};

export default Dash;