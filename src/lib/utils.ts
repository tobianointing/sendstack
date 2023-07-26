import { clsx, type ClassValue } from "clsx";
import { UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleDynamicDate = (
  date: Date,
  form: UseFormReturn<
    {
      date: Date;
      note: string;
    },
    any,
    undefined
  >
) => {
  form.setValue("date", date);
  console.log(date);
};
