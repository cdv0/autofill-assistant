import NavItem from "../atoms/NavItem";
import { useState } from "react";

interface NavProps {

}

const NavBar = ({ }: NavProps) => {
  const [toggle, setToggle] = useState(false)

  // TODO: Delete dummy data (fields)
  const fields = [
    { id: 1, label: "Address", onClick: () => {} },
    { id: 2, label: "Health", onClick: () => {} },
    { id: 3, label: "Personal Information", onClick: () => {} },
  ];
  return (
    
    <div className="flex flex-col bg-white rounded-2xl border border-stroke p-4 gap-2">
      {/* DROPDOWN */}
      <NavItem text="All groups" onClick={() => setToggle(prev => !prev)} isDropdown={true} className={ toggle ? "bg-lightBlue" : ""} isOpen={toggle}/>

      {/* ALL GROUP ITEMS */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          toggle ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}>

        <div className="flex flex-col gap-2 pt-1">
          {toggle && 
            fields.map((field) => (
              <NavItem key={field.id} text={field.label} onClick={field.onClick} style="lightGray"/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default NavBar;