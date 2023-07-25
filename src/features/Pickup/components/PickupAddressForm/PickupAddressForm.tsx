"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import manboxes from "@/assets/man-and-boxes.svg";
import { RequestInputField } from "@/features/ui/components/RequestInputField";
import { RequestSelectField } from "@/features/ui/components/RequestSelectField";
import { useRequestState } from "@/store";
import { FormStepType } from "@/types";
import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import Image from "next/image";
import { LuHome, LuTruck } from "react-icons/lu";
import { shallow } from "zustand/shallow";

const FormSchema = z.object({
  pickup_area: z.string().nonempty(),
  pickup_location: z.string().nonempty(),
  pickup_option: z.string().nonempty(),
  pickup_address: z.string().nonempty(),
});

type Props = {
  locations: any;
};

export const PickupAddressForm = (props: FormStepType & Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [pickup, setPickupDetails] = useRequestState(
    (state) => [state.pickup_details, state.setPickupDetails],
    shallow
  );

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setPickupDetails({
      ...pickup,
      locationCode: data.pickup_location,
      address: data.pickup_address,
    });
    {
      props.onNext && props.onNext();
    }
  }

  return (
    <>
      <div className="flex relative justify-center w-auto h-[200px]">
        <Image
          src={manboxes}
          fill
          className="object-contain"
          alt="get form illustration"
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="pickup_area"
            render={({ field }) => (
              <FormItem>
                <RequestSelectField
                  field={field}
                  items={[{ name: "Lagos", value: "lagos" }]}
                  Icon={LuTruck}
                  placeholder="Pickup Area"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pickup_location"
            render={({ field }) => (
              <FormItem>
                <RequestSelectField
                  field={field}
                  items={props.locations.map((location: any) => ({
                    name: location.name,
                    value: location.locationCode,
                  }))}
                  Icon={LuTruck}
                  placeholder="Pickup Location"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pickup_option"
            render={({ field }) => (
              <FormItem>
                <RequestSelectField
                  field={field}
                  items={[
                    { name: "Home / Doorstep pickup", value: "home" },
                    { name: "Locker dropoff", value: "locker" },
                  ]}
                  Icon={LuTruck}
                  placeholder="Pickup Option"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pickup_address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RequestInputField
                    field={undefined}
                    placeholder="Pickup address e.g 12, Shoprite, Ikeja"
                    {...field}
                    Icon={LuHome}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Continue
          </Button>
        </form>
      </Form>
    </>
  );
};
