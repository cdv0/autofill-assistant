import Groups, { type GroupsProps } from "./Groups";

interface ShellProps extends GroupsProps {
}

const Shell = (props: ShellProps) => {
  return (
    <div className="bg-white py-4 px-6 border border-stroke rounded-2xl">
      <Groups {...props}/>
    </div>
  )
}

export default Shell;