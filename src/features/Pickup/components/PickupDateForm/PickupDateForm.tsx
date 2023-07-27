"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/features/ui/button";
import { Calendar } from "@/features/ui/calendar";
import { PickupDateButton } from "@/features/ui/components/PickupDateButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/features/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/features/ui/popover";
import { Textarea } from "@/features/ui/textarea";
import { cn, handleDynamicDate } from "@/lib/utils";
import { useRequestState } from "@/store";
import { FormStepType } from "@/types";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format, subDays } from "date-fns";

const FormSchema = z.object({
  date: z.date({
    required_error: "A pickup date is required.",
  }),
  note: z
    .string()
    .min(4, {
      message: "Note must be at least 4 characters.",
    })
    .max(160, {
      message: "Note must not be longer than 30 characters.",
    }),
});

export const PickupDateForm = (props: FormStepType) => {
  const [pickup, setPickup] = useRequestState((state) => [
    state.pickup,
    state.setPickup,
  ]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: pickup.pickupDate ? new Date(pickup.pickupDate) : undefined,
      note: pickup.note,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setPickup({
      ...pickup,
      pickupDate: format(data.date, "yyyy-MM-dd"),
      note: data.note,
    });
    {
      props.onNext && props.onNext();
    }
  }

  const isBefore10am = new Date().getTime() < new Date().setHours(10, 0, 0, 0);

  const disabledDays = [
    { from: new Date(1900, 0, 0), to: subDays(new Date(), 1) },
    !isBefore10am && new Date(),
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div className="inline-block mb-2 text-sm font-semibold dark:text-slate-50">
              Date
            </div>
            <div className="flex gap-2">
              {isBefore10am && (
                <PickupDateButton
                  day={"Today"}
                  date={format(new Date(), "MMM do")}
                  onClick={() => handleDynamicDate(new Date(), form)}
                />
              )}
              <PickupDateButton
                day={"Tomorrow"}
                date={format(addDays(new Date(), 1), "MMM do")}
                onClick={() => handleDynamicDate(addDays(new Date(), 1), form)}
              />
              <PickupDateButton
                day={format(addDays(new Date(), 2), "iiii")}
                date={format(addDays(new Date(), 2), "MMM do")}
                onClick={() => handleDynamicDate(addDays(new Date(), 2), form)}
              />
              {!isBefore10am && (
                <PickupDateButton
                  day={format(addDays(new Date(), 3), "iiii")}
                  date={format(addDays(new Date(), 3), "MMM do")}
                  onClick={() =>
                    handleDynamicDate(addDays(new Date(), 2), form)
                  }
                />
              )}
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
                      disabled={disabledDays}
                      initialFocus
                      className="w-full"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-4">
                <FormLabel htmlFor="note">Booking Note</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g Kindly pickup the package from the gateman"
                    className="resize-none"
                    {...field}
                    data-testid="note"
                  />
                </FormControl>
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
