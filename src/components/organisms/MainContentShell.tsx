import Groups, { type GroupsProps } from "./Groups";
import GroupEdit, { type GroupEditProps } from "./GroupEdit";
import GroupView, { type GroupViewProps } from "./GroupView";
import AccountEdit, { type AccountEditProps } from "./AccountEdit";
import AccountView, { type AccountViewProps } from "./AccountView";

export interface ShellProps extends GroupsProps, AccountEditProps, AccountViewProps, GroupEditProps, GroupViewProps {
  shellMode: "groups" | "groupView" | "groupEdit" | "accountView" | "accountEdit";
}

const Shell = ( { 
  shellMode,
  onClickRow,
  onClickBack,
  groupName,
  onClickAddField,
  onClickTrash,
 }: ShellProps) => {
  return (
    <div className={`bg-white py-4 px-6 pb-8 border border-stroke rounded-2xl flex-1 min-h-0 overflow-y-auto`}>
      {shellMode === "groups" && (
        <Groups onClickBack={onClickBack} onClickRow={onClickRow} />
      )}

      {shellMode === "groupView" && (
        <GroupView groupName={groupName} onClickBack={onClickBack}/>
      )}

      {shellMode === "groupEdit" && (
        <GroupEdit groupName={groupName} onClickBack={onClickBack} onClickAddField={onClickAddField} onClickTrash={onClickTrash} />
      )}

      {shellMode === "accountView" && (
        <AccountView />
      )}

      {shellMode === "accountEdit" && (
        <AccountEdit />
      )}
    </div>
  )
}

export default Shell;