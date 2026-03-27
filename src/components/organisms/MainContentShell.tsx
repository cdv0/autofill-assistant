import { type GroupsProps } from "./Groups";
import AccountView from "./AccountView";

interface ShellProps extends GroupsProps {
}

const Shell = (props: ShellProps) => {
  return (
    <div className="bg-white py-4 px-6 pb-8 border border-stroke rounded-2xl">
      <AccountView />
    </div>
  )
}

export default Shell;