import DashLayout from "../templates/DashLayout";
import { useEffect, useState, useCallback } from "react";
import Modal from "../organisms/Modal";
import { supabase } from "../../lib/supabaseClient";
import { createGroup, deleteGroup, fetchAllGroups } from "../../services/groupService";
import { insertField } from "../../services/groupFieldService";
import { useNavigate } from "react-router-dom";
import { updateUserEmail, updateUserPassword, fetchUser } from "../../services/accountService";
import { type GroupData } from "../organisms/GroupView";

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
  const [groups, setGroups] = useState<GroupData[]>([]);

  // Account edit state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountNotification, setAccountNotification] = useState<string | null>(null);

  const loadGroups = useCallback(async () => {
    const data = await fetchAllGroups();
    setGroups(data ?? []);
  }, []);

  useEffect(() => {
    loadGroups();
  }, [loadGroups, refreshKey]);

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

  const goToAccountEdit = async () => {
    const user = await fetchUser();
    if (user?.email) setEmail(user.email);
    setPassword("");
    setAccountNotification(null);
    setShellMode("accountEdit");
    setControlMode("editing");
    setContext("account");
    setIsCreating(false);
  };

  const handleSaveAccount = async () => {
    let notification: string | null = null;

    if (email) {
      await updateUserEmail(email);
      notification = "Check your new email to confirm the change.";
    }
    if (password) {
      await updateUserPassword(password);
      notification = "Password updated successfully.";
    }

    setAccountNotification(notification);
    goToAccountView();

    setTimeout(() => setAccountNotification(null), 4000);
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;
    await createGroup(newGroupName.trim());
    setShowCreateModal(false);
    setNewGroupName("");
    setRefreshKey((prev) => prev + 1);
  };

  const handleDeleteGroup = async () => {
    if (!groupId) return;
    await deleteGroup(groupId);
    setShowDeleteModal(false);
    setRefreshKey((prev) => prev + 1);
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
        groups={groups}
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
        onClickTrash={() => {}}
        refreshKey={refreshKey}
        onFieldCountChange={setFieldCount}

        // Account edit state
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        accountNotification={accountNotification}

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
            handleSaveAccount();
          } else {
            goToGroupView(groupName);
          }
        }}
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
        onClickHome={goToGroups}
      />

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowDeleteModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Modal
              variant="delete"
              id={groupId ?? ""}
              displayName={groupName ?? ""}
              category="Group"
              onClickCancel={() => setShowDeleteModal(false)}
              onClickConfirm={handleDeleteGroup}
            />
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowCreateModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
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
        </div>
      )}

      {/* Add Field Modal */}
      {showAddFieldModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddFieldModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
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
        </div>
      )}
    </>
  );
};

export default Dash;