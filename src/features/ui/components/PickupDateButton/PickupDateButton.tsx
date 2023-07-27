type Props = {
  date: string;
  day: string;
  onClick?: () => void;
};

export const PickupDateButton = (props: Props) => {
  return (
    <button
      className="w-1/3 p-3 border rounded-md text-start hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-50 focus:outline-none"
      type="button"
      onClick={props.onClick}
    >
      <h1 className="text-sm font-semibold">{props.day}</h1>
      <p className="text-xs text-slate-500">{props.date}</p>
    </button>
  );
};
