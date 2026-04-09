import NavItem from "../atoms/NavItem";
import { useEffect, useState } from "react";
import { CircleUserRound, LogOut } from "lucide-react";
import { fetchAllGroups } from "../../services/groupService";

interface Group {
  group_id: string;
  name: string;
  last_modified?: string;
}

export interface NavProps {
  onClickAccount: () => void;
  onClickLogOut: () => void;
  onClickGroup: (id: string, name: string) => void;
  borderless?: boolean;
}

const NavBar = ({
  onClickAccount,
  onClickLogOut,
  onClickGroup,
  borderless = false,
}: NavProps) => {
  const [toggle, setToggle] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const loadGroups = async () => {
      const data = await fetchAllGroups();
      setGroups(data ?? []);
    };

    loadGroups();
  }, []);

  return (
    <div
      className={`flex flex-col bg-white rounded-2xl p-4 gap-2 justify-between min-w-64 max-w-80 h-full ${
        borderless ? "" : "border border-stroke"
      }`}
    >
      {/* TOP SECTION */}
      <div>
        <NavItem
          text="All groups"
          onClick={() => setToggle((prev) => !prev)}
          isDropdown={true}
          className={toggle ? "bg-lightBlue" : ""}
          isOpen={toggle}
        />

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            toggle ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 pt-1">
            {toggle &&
              groups.map((group) => (
                <NavItem
                  key={group.group_id}
                  text={group.name}
                  onClick={() => onClickGroup(group.group_id, group.name)}
                  style="lightGray"
                  textSize="text-sm"
                  className="py-3"
                />
              ))}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="flex flex-col gap-2 pt-1">
        <NavItem
          style="lightGray"
          icon={CircleUserRound}
          text="Account"
          onClick={onClickAccount}
        />
        <NavItem
          style="danger"
          icon={LogOut}
          text="Log out"
          onClick={onClickLogOut}
          className="text-danger"
        />
      </div>
    </div>
  );
};

export default NavBar;