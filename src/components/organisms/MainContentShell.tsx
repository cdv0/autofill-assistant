import { type GroupsProps } from "./Groups";
import AccountEdit from "./AccountEdit";
interface ShellProps extends GroupsProps {
}

const Shell = (props: ShellProps) => {
  return (
    <div className="bg-white py-4 px-6 pb-8 border border-stroke rounded-2xl">
      <AccountEdit />
    </div>
  )
}

export default Shell;