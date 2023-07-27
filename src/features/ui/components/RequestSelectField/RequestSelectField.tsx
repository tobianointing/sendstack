import { FormControl } from "@/features/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/ui/select";
import { ItemType } from "@/types";

type Props = {
  field: any;
  items: ItemType[];
  placeholder: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const RequestSelectField = ({
  field,
  items,
  placeholder,
  Icon,
}: Props) => {
  return (
    <div className="relative">
      <Icon className="absolute w-5 h-5 top-2/4 -translate-y-2/4 left-3 stroke-slate-500" />
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger className=" dark:text-slate-50">
            <SelectValue
              placeholder={placeholder}
              className="placeholder:text-slate-500 dark:placeholder-slate-50 dark:text-slate-50"
            />
          </SelectTrigger>
        </FormControl>
        <SelectContent position="popper" side="top">
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
