import { type GroupsProps } from "./Groups";
import GroupEdit from "./GroupEdit";

interface ShellProps extends GroupsProps {
}

const Shell = (props: ShellProps) => {
  return (
    <div className="bg-white py-4 px-6 pb-8 border border-stroke rounded-2xl">
      <GroupEdit groupName="Health" onClickBack={() => {}} onClickTrash={() => {}}/>
    </div>
  )
}

export default Shell;