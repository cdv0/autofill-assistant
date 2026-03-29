import { Trash2 } from "lucide-react";

interface GroupRowProps {
    name: string;
    dateModified: Date;
    onClick: () => void;
}

const GroupRow = ({
    name,
    dateModified,
    onClick
}: GroupRowProps) => {
    return (
        <button className="flex justify-between items-center w-full p-4 bg-white rounded-2xl hover:bg-gray-100 transition cursor-pointer" onClick={onClick}>
            <div>
                <p className="font-semibold">{name}</p>
            </div>

            <div className="flex items-center gap-6 justify-center">
                <p className="text-darkGray text-sm">{dateModified.toLocaleDateString()}</p>
                {/* <Trash2 className="w-5 h-5 hover:text-danger transition" strokeWidth={1.5} /> */}
            </div>
        </button>
    )
}

export default GroupRow;