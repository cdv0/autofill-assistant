import DashLayout from "../templates/DashLayout";
import { useEffect, useState } from "react";
import Modal from "../organisms/Modal";
import { supabase } from "../../lib/supabaseClient";
import { createGroup, deleteGroup } from "../../services/groupService";
import { insertField } from "../../services/groupFieldService";
import { useNavigate } from "react-router-dom";

const Dash = () => {
  const navigate = useNavigate();

  const [shellMode, setShellMode] = useState<"groups" | "groupView" | "groupEditCreate" | "accountView" | "accountEdit">("groups");
  const [controlMode, setControlMode] = useState<"viewing" | "editing" | "editOnly" | "createOnly">("createOnly");
  const [groupName, setGroupName] = useState<string | undefined>(undefined);
  const [groupId, setGroupId] = useState<string | undefined>(undefined);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");
  const [fieldCount, setFieldCount] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
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

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;
    await createGroup(newGroupName.trim());
    setShowCreateModal(false);
    setNewGroupName("");
  };

  const handleDeleteGroup = async () => {
    if (!groupId) return;
    await deleteGroup(groupId);
    setShowDeleteModal(false);
    goToGroups();
  };

  const handleAddField = async () => {
    if (!newFieldLabel.trim() || !groupId) return;
    await insertField({
      fields_id: crypto.randomUUID(),
      group_id: groupId,
      label: newFieldLabel.trim(),
      value: newFieldValue.trim(),
      position: fieldCount + 1,
    });
    setRefreshKey((prev) => prev + 1);
    setShowAddFieldModal(false);
    setNewFieldLabel("");
    setNewFieldValue("");
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
        onClickRow={(id, name) => {
          setGroupId(id);
          goToGroupView(name);
        }}
        onClickGroup={(id, name) => {
          setGroupId(id);
          goToGroupView(name);
        }}
        onClickBack={goToGroups}
        groupName={groupName}
        groupId={groupId}
        onClickAddField={() => {}}
        onClickTrash={() => {}} // TODO: add delete trash logic backend
        refreshKey={refreshKey}
        onFieldCountChange={setFieldCount}

        // ControlBar
        controlMode={controlMode}
        onDelete={() => setShowDeleteModal(true)}
        onCreate={() => setShowCreateModal(true)}
        onAddField={() => setShowAddFieldModal(true)}
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

      {/* Delete Modal Overlay */}
      {showDeleteModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowDeleteModal(false)}>
          <Modal
            variant="delete"
            id={groupId ?? ""}
            displayName={groupName ?? ""}
            category="Group"
            onClickCancel={() => setShowDeleteModal(false)}
            onClickConfirm={handleDeleteGroup}
          />
        </div>
      )}

      {/* Create Modal Overlay */}
      {showCreateModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowCreateModal(false)}>
          <Modal
            variant="create"
            category="Group"
            inputValue={newGroupName}
            onInputChange={(e) => setNewGroupName(e.target.value)}
            onClickCancel={() => {
              setShowCreateModal(false);
              setNewGroupName("");
            }}
            onClickConfirm={handleCreateGroup}
          />
        </div>
      )}

      {/* Add Field Modal Overlay */}
      {showAddFieldModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddFieldModal(false)}>
          <Modal
            variant="edit"
            category="Field"
            titleOverride="Add field"
            labelText="Enter label"
            valueText="Enter value"
            labelValue={newFieldLabel}
            onLabelChange={(e) => setNewFieldLabel(e.target.value)}
            valueValue={newFieldValue}
            onValueChange={(e) => setNewFieldValue(e.target.value)}
            onClickCancel={() => {
              setShowAddFieldModal(false);
              setNewFieldLabel("");
              setNewFieldValue("");
            }}
            onClickConfirm={handleAddField}
          />
        </div>
      )}
    </>
  );
};

export default Dash;