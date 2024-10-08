"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import deliveryMan from "@/assets/delivery-man.svg";
import { Button } from "@/features/ui/button";
import { RequestInputField } from "@/features/ui/components/RequestInputField";
import { RequestSelectField } from "@/features/ui/components/RequestSelectField";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/features/ui/form";
import { useRequestState } from "@/store";
import { FormStepType } from "@/types";
import Image from "next/image";
import { LuHome, LuTruck } from "react-icons/lu";
import { shallow } from "zustand/shallow";

export const FormSchema = z.object({
  dropoff_area: z.string().nonempty(),
  dropoff_location: z.string().nonempty(),
  dropoff_address: z.string().nonempty(),
});

type Props = {
  locations: any;
};

export const DropoffAddressForm = (props: FormStepType & Props) => {
  const [drop, setDrop] = useRequestState(
    (state) => [state.drop, state.setDrop],
    shallow
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dropoff_location: drop.locationCode,
      dropoff_address: drop.address,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setDrop({
      ...drop,
      locationCode: data.dropoff_location,
      address: data.dropoff_address,
    });

    {
      props.onNext && props.onNext();
    }
  }

  return (
    <>
      <div className="flex relative justify-center w-full h-[200px]">
        <Image
          src={deliveryMan}
          fill
          className="object-contain"
          alt="get form illustration"
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="dropoff_area"
            render={({ field }) => (
              <FormItem>
                <RequestSelectField
                  field={field}
                  items={[{ name: "Lagos", value: "lagos" }]}
                  Icon={LuTruck}
                  placeholder="Dropoff Area"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dropoff_location"
            render={({ field }) => (
              <FormItem>
                <RequestSelectField
                  field={field}
                  items={props.locations.map((location: any) => ({
                    name: location.name,
                    value: location.locationCode,
                  }))}
                  Icon={LuTruck}
                  placeholder="Dropoff Location"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dropoff_address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RequestInputField
                    field={undefined}
                    placeholder="Dropoff address e.g 12, Shoprite, Ikeja"
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
