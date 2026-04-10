import NavBar, { type NavProps } from "../organisms/NavigationBar";
import Shell, { type ShellProps } from "../organisms/MainContentShell";
import ControlBar, { type ControlBarProps } from "../molecules/ControlBar";
import Logo, { type LogoProps } from "../atoms/Logo";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface DashLayoutProps extends ControlBarProps, NavProps, ShellProps, LogoProps {}

const DashLayout = ({
  // NavBar props
  onClickAccount,
  onClickLogOut,
  onClickHome,
  // ControlBar props
  controlMode,
  onCreate,
  onAddField,
  onSave,
  onDelete,
  onCancel,
  onEdit,
  // Shell props
  onClickRow,
  onClickBack,
  shellMode,
  groupId,
  groupName,
  onClickAddField,
  onClickTrash,
  context,
  refreshKey,
  onFieldCountChange,
  onClickGroup,
  groups,
  // Account props
  email,
  password,
  accountNotification,
  onEmailChange,
  onPasswordChange,
  // Logo props
  onClickLogo,
}: DashLayoutProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen w-full p-4 md:p-6 flex flex-col">
      <div className="flex gap-6 flex-1">

        {/* Sidebar — desktop only */}
        <div className="hidden md:flex flex-col gap-2 w-64">
          <Logo size="lg" onClickLogo={onClickLogo} />
          <NavBar
            onClickAccount={onClickAccount}
            onClickLogOut={onClickLogOut}
            onClickGroup={onClickGroup}
            onClickHome={onClickHome}
            groups={groups}
          />
        </div>

        {/* Main column */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">

          {/* Mobile top bar */}
          <div className="relative flex md:hidden items-center justify-center">
            <button
              onClick={() => setDrawerOpen(true)}
              className="absolute left-0 p-2 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Logo size="sm" onClickLogo={onClickLogo} />
          </div>

          <ControlBar
            controlMode={controlMode}
            onCreate={onCreate}
            onAddField={onAddField}
            onSave={onSave}
            onDelete={onDelete}
            onCancel={onCancel}
            onEdit={onEdit}
          />

          <Shell
            shellMode={shellMode}
            onClickRow={onClickRow}
            onClickBack={onClickBack}
            groupId={groupId}
            groupName={groupName}
            onClickAddField={onClickAddField}
            onClickTrash={onClickTrash}
            context={context}
            refreshKey={refreshKey}
            onFieldCountChange={onFieldCountChange}
            groups={groups}
            email={email}
            password={password}
            onEmailChange={onEmailChange}
            onPasswordChange={onPasswordChange}
            accountNotification={accountNotification}
          />
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div className={`fixed top-0 left-0 h-full z-50 flex flex-col gap-2 py-4 bg-white w-72 transition-transform duration-300 ease-in-out md:hidden ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-4">
          <Logo size="md" onClickLogo={() => { onClickLogo?.(); setDrawerOpen(false); }} />
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <NavBar
          onClickAccount={() => { onClickAccount(); setDrawerOpen(false); }}
          onClickLogOut={onClickLogOut}
          onClickHome={() => { onClickHome(); setDrawerOpen(false);}}
          onClickGroup={(id, name) => {
            onClickGroup(id, name);
            setDrawerOpen(false);
          }}
          groups={groups}
          borderless
        />
      </div>
    </div>
  );
};

export default DashLayout;