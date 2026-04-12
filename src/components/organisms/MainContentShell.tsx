import Groups from "./Groups";
import GroupView from "./GroupView";
import GroupEdit from "./GroupEditCreate";
import AccountView from "./AccountView";
import AccountEdit from "./AccountEdit";
import { type GroupData } from "../../types/groups";

export type ShellMode =
  | "groups"
  | "groupView"
  | "groupEditCreate"
  | "accountView"
  | "accountEdit";

export interface ShellProps {
  shellMode: ShellMode;
  groups: GroupData[];
  onClickRow: (id: string, name: string) => void;
  onClickBack?: () => void;
  groupId?: string;
  groupName?: string;
  onClickAddField?: () => void;
  onClickTrash?: (fields_id: string) => void;
  context: "groups" | "account";
  refreshKey?: number;
  email?: string;
  password?: string;
  onEmailChange?: (val: string) => void;
  onPasswordChange?: (val: string) => void;
  accountNotification?: string;
}

const Shell = ({
  shellMode,
  groups,
  onClickRow,
  onClickBack,
  groupId,
  groupName,
  onClickAddField,
  onClickTrash,
  context,
  refreshKey,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  accountNotification,
}: ShellProps) => {
  const renderContent = () => {
    switch (shellMode) {
      case "groups":
        return <Groups groups={groups} onClickRow={onClickRow} />;

      case "groupView":
        if (!groupId || !onClickBack) return null;
        return (
          <GroupView
            groupId={groupId}
            onClickBack={onClickBack}
            refreshKey={refreshKey}
          />
        );

      case "groupEditCreate":
        if (!groupId || !onClickBack) return null;
        return (
          <GroupEdit
            groupId={groupId}
            groupName={groupName}
            onClickBack={onClickBack}
            onClickAddField={onClickAddField}
            onClickTrash={onClickTrash}
            context={context}
          />
        );

      case "accountView":
        return (
          <AccountView
            email={email}
            password={password}
            accountNotification={accountNotification}
          />
        );

      case "accountEdit":
        return (
          <AccountEdit
            email={email}
            password={password}
            onEmailChange={onEmailChange}
            onPasswordChange={onPasswordChange}
            accountNotification={accountNotification}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stroke p-6 md:p-8 min-h-full">
      {renderContent()}
    </div>
  );
};

export default Shell;