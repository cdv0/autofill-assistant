interface LabelViewProps {
    label: string;
    value: string;
}

const LabelView = ({
    label,
    value,
}: LabelViewProps) => {
    return (
        <div className="flex flex-col gap-1">
          <p className="font-medium text-base text-darkGray">{label}</p>
          <p>{value}</p>
        </div>
    )
}

export default LabelView;