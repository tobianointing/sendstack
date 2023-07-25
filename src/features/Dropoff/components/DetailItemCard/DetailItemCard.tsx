type Props = {
  title: string;
  value: string;
};

export const DetailItemCard = (props: Props) => {
  return (
    <div>
      <h1 className="text-sm font-semibold">{props.title} </h1>
      <p className="text-sm text-slate-500">{props.value}</p>
    </div>
  );
};
