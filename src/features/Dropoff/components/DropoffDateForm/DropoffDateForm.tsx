"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import manboxes from "@/assets/man-and-boxes.svg";
import { Calendar } from "@/features/ui/calendar";
import { PickupDateButton } from "@/features/ui/components/PickupDateButton";
import { Form, FormField, FormItem, FormMessage } from "@/features/ui/form";
import { cn, handleDynamicDate } from "@/lib/utils";
import { FormStepType } from "@/types";
import { Button } from "@/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import Image from "next/image";

const FormSchema = z.object({
  date: z.date({
    required_error: "A pickup date is required.",
  }),
});

export const DropoffDateForm = (props: FormStepType) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    {
      props.onNext && props.onNext();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-4">
          <div className="flex relative justify-center w-full h-[200px]">
            <Image
              src={manboxes}
              fill
              className="object-contain"
              alt="get form illustration"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="inline-block mb-2 text-sm font-semibold"
              htmlFor="Date"
            >
              Date
            </label>
            <div className="flex gap-2">
              <PickupDateButton
                day={"Today"}
                date={format(addDays(new Date(), 1), "MMM do")}
                onClick={() => handleDynamicDate(addDays(new Date(), 1), form)}
              />
              <PickupDateButton
                day={"Tomorrow"}
                date={format(addDays(new Date(), 2), "MMM do")}
                onClick={() => handleDynamicDate(addDays(new Date(), 2), form)}
              />
              <PickupDateButton
                day={format(addDays(new Date(), 3), "eee")}
                date={format(addDays(new Date(), 3), "MMM do")}
                onClick={() => handleDynamicDate(addDays(new Date(), 3), form)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-full h-[1px] bg-slate-500"></div>
            <span className="text-sm text-slate-500">or</span>
            <div className="w-full h-[1px] bg-slate-500"></div>
          </div>

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal text-sm",
                        !field.value && "text-slate-500 text-sm"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      className="w-full"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button>Continue</Button>
        </div>
      </form>
    </Form>
  );
};
