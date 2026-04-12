import DashLayout from "../templates/DashLayout";
import { useEffect, useState, useCallback } from "react";
import Modal from "../organisms/Modal";
import { supabase } from "../../lib/supabaseClient";
import { createGroup, deleteGroup, fetchAllGroups } from "../../services/groupService";
import { insertField } from "../../services/groupFieldService";
import { useNavigate } from "react-router-dom";
import { updateUserEmail, updateUserPassword, fetchUser } from "../../services/accountService";
import { type GroupData } from "../../types/groups";

type ShellMode = "groups" | "groupView" | "groupEditCreate" | "accountView" | "accountEdit";
type ControlMode = "viewing" | "editing" | "editOnly" | "createOnly";

const SHELL_MODE_KEY = "shellMode";
const GROUP_ID_KEY = "groupId";
const GROUP_NAME_KEY = "groupName";

const Dash = () => {
  const navigate = useNavigate();

  const savedShellMode = (localStorage.getItem(SHELL_MODE_KEY) as ShellMode) ?? "groups";
  const savedGroupId = localStorage.getItem(GROUP_ID_KEY) ?? undefined;
  const savedGroupName = localStorage.getItem(GROUP_NAME_KEY) ?? undefined;

  const getInitialControlMode = (mode: ShellMode): ControlMode => {
    switch (mode) {
      case "groups": return "createOnly";
      case "groupView": return "viewing";
      case "groupEditCreate": return "editing";
      case "accountView": return "editOnly";
      case "accountEdit": return "editing";
    }
  };

  const [shellMode, setShellMode] = useState<ShellMode>(savedShellMode);
  const [controlMode, setControlMode] = useState<ControlMode>(getInitialControlMode(savedShellMode));
  const [groupName, setGroupName] = useState<string | undefined>(savedGroupName);
  const [groupId, setGroupId] = useState<string | undefined>(savedGroupId);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");
  const [fieldCount] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [context, setContext] = useState<"groups" | "account">(
    savedShellMode.startsWith("account") ? "account" : "groups"
  );
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<GroupData[]>([]);

  // Account edit state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountNotification, setAccountNotification] = useState<string | null>(null);

  // Persist shellMode, groupId, groupName to localStorage
  useEffect(() => {
    localStorage.setItem(SHELL_MODE_KEY, shellMode);
  }, [shellMode]);

  useEffect(() => {
    if (groupId) localStorage.setItem(GROUP_ID_KEY, groupId);
    else localStorage.removeItem(GROUP_ID_KEY);
  }, [groupId]);

  useEffect(() => {
    if (groupName) localStorage.setItem(GROUP_NAME_KEY, groupName);
    else localStorage.removeItem(GROUP_NAME_KEY);
  }, [groupName]);

  const loadGroups = useCallback(async () => {
    const data = await fetchAllGroups();
    setGroups(data ?? []);
  }, []);

  useEffect(() => {
    loadGroups();
  }, [loadGroups, refreshKey]);

  // Auth check using onAuthStateChange to avoid redirect flicker
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((session) => {
      if (!session) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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
        onClickLogo={goToGroups}
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
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        accountNotification={accountNotification ?? undefined}
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
        onClickAccount={goToAccountView}
        onClickLogOut={async () => {
          localStorage.removeItem(SHELL_MODE_KEY);
          localStorage.removeItem(GROUP_ID_KEY);
          localStorage.removeItem(GROUP_NAME_KEY);
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