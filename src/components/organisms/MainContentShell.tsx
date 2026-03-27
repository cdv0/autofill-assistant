import { Group } from "lucide-react";
import Groups, { type GroupsProps } from "./Groups";
import GroupView from "./GroupView";

interface ShellProps extends GroupsProps {
}

const Shell = (props: ShellProps) => {
  return (
    <div className="bg-white py-4 px-6 border border-stroke rounded-2xl">
      <GroupView />
    </div>
  )
}

export default Shell;