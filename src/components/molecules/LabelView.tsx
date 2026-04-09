import { Pencil, Trash2 } from "lucide-react";

interface LabelViewProps {
    label: string;
    value: string;
    onClickEdit?: () => void;
    onClickDelete?: () => void;
}

const LabelView = ({
    label,
    value,
    onClickEdit,
    onClickDelete,
}: LabelViewProps) => {
    return (
        <div className="group flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <p className="text-base text-darkGray">{label}</p>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onClickEdit && (
                <button onClick={onClickEdit}>
                  <Pencil strokeWidth={1.5} className="w-4 h-4 text-secondary hover:text-primary" />
                </button>
              )}
              {onClickDelete && (
                <button onClick={onClickDelete}>
                  <Trash2 strokeWidth={1.5} className="w-4 h-4 hover:text-danger" />
                </button>
              )}
            </div>
          </div>
          <p className="text-base text-primary font-medium">{value}</p>
        </div>
    )
}

export default LabelView;