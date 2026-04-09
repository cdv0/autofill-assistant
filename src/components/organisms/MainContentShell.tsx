import Groups, { type GroupsProps } from "./Groups";
import GroupEdit, { type GroupEditProps } from "./GroupEditCreate";
import GroupView, { type GroupViewProps } from "./GroupView";
import AccountEdit, { type AccountEditProps } from "./AccountEdit";
import AccountView, { type AccountViewProps } from "./AccountView";

export interface ShellProps extends GroupsProps, AccountEditProps, AccountViewProps, GroupEditProps, GroupViewProps {
  shellMode: "groups" | "groupView" | "groupEditCreate" | "accountView" | "accountEdit";
  accountNotification?: string | null;
}

const Shell = ({ 
  shellMode,
  groups,
  onClickRow,
  onClickBack,
  groupId,
  onClickTrash,
  context,
  refreshKey,
  onFieldCountChange,
  accountNotification,
  // Account props
  email,
  password,
  onEmailChange,
  onPasswordChange,
}: ShellProps) => {
  return (
    <div className="bg-white py-4 px-6 pb-8 border border-stroke rounded-2xl flex-1 min-h-0 overflow-y-auto">
      {shellMode === "groups" && (
        <Groups onClickBack={onClickBack} onClickRow={onClickRow} groups={groups} />
      )}

      {shellMode === "groupView" && (
        <GroupView groupId={groupId} onClickBack={onClickBack} refreshKey={refreshKey}/>
      )}

      {shellMode === "groupEditCreate" && (
        <GroupEdit groupId={groupId} onClickBack={onClickBack} onClickTrash={onClickTrash} context={context} />
      )}

      {shellMode === "accountView" && (
        <AccountView notification={accountNotification} />
      )}

      {shellMode === "accountEdit" && (
        <AccountEdit
          email={email}
          password={password}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
        />
      )}
    </div>
  );
};

export default Shell;