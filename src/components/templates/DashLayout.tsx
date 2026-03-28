// DashLayout.tsx
import NavBar, { type NavProps } from "../organisms/NavigationBar";
import Shell, { type ShellProps } from "../organisms/MainContentShell";
import ControlBar, { type ControlBarProps } from "../molecules/ControlBar";
import Logo from "../atoms/Logo";

interface DashLayoutProps extends ControlBarProps, NavProps, ShellProps {}

const DashLayout = ({
  // NavBar props
  onClickAccount,
  onClickLogOut,
  // ControlBar props
  controlMode,
  onCreate,
  onSave,
  onDelete,
  onCancel,
  onEdit,
  // Shell props
  onClickRow,
  onClickBack,
  shellMode,
  groupName,
  onClickAddField,
  onClickTrash,
}: DashLayoutProps) => {
  return (
    <div className="min-h-screen w-full p-6 flex flex-col">
      <div className="flex gap-6 flex-1"> 

        {/* Sidebar */}
        <div className="flex flex-col gap-6 w-64">
          <Logo size="lg" />
          <NavBar
            onClickAccount={onClickAccount}
            onClickLogOut={onClickLogOut}
          />
        </div>

        {/* Main column */}
        <div className="flex-1 flex flex-col gap-6">
          <ControlBar
            controlMode={controlMode}
            onCreate={onCreate}
            onSave={onSave}
            onDelete={onDelete}
            onCancel={onCancel}
            onEdit={onEdit}
          />

          <Shell
            shellMode={shellMode}
            onClickRow={onClickRow}
            onClickBack={onClickBack}
            groupName={groupName}
            onClickAddField={onClickAddField}
            onClickTrash={onClickTrash}
          />
        </div>

      </div>
    </div>
  );
};

export default DashLayout;