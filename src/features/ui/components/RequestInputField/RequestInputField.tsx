import { Input } from "@/features/ui/input";
import { forwardRef } from "react";

type Props = {
  field: any;
  placeholder: string;
  type?: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const RequestInputField = forwardRef<HTMLInputElement, Props>(
  ({ field, placeholder, type, Icon, ...props }, ref) => {
    return (
      <div className="relative">
        <Icon className="absolute w-5 h-5 top-2/4 -translate-y-2/4 left-3 stroke-slate-500" />
        <Input
          type={type ? type : "text"}
          placeholder={placeholder}
          className="pl-10 pr-3 placeholder:text-slate-500"
          {...field}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

RequestInputField.displayName = "RequestInputField";
