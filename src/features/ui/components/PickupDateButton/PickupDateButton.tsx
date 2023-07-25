type Props = {
  date: string;
  day: string;
  onClick?: () => void;
};

export const PickupDateButton = (props: Props) => {
  return (
    <button
      className="w-1/3 p-3 border rounded-md text-start hover:bg-slate-100 active:bg-slate-200 focus:outline-none"
      type="button"
      onClick={props.onClick}
    >
      <h1 className="text-sm font-semibold">{props.day}</h1>
      <p className="text-xs text-slate-500">{props.date}</p>
    </button>
  );
};
