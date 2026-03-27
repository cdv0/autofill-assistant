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
          <p className="text-base text-darkGray">{label}</p>
          <p className="text-base text-primary font-medium">{value}</p>
        </div>
    )
}

export default LabelView;