"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import manboxes from "@/assets/man-and-boxes.svg";
import { Button } from "@/features/ui/button";
import { RequestInputField } from "@/features/ui/components/RequestInputField";
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
import { LuMail, LuPhone, LuUser } from "react-icons/lu";

const FormSchema = z.object({
  name: z.string().nonempty(),
  phone_number: z.string().nonempty(),
  alternative_phone_number: z.string().nonempty(),
  email: z.string().email().optional(),
});

export const PickupPersonalDetailForm = (props: FormStepType) => {
  const [pickup, setPickup] = useRequestState((state) => [
    state.pickup,
    state.setPickup,
  ]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: pickup.pickupName,
      phone_number: pickup.pickupNumber,
      alternative_phone_number: pickup.altPickupNumber,
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setPickup({
      ...pickup,
      pickupName: data.name,
      pickupNumber: data.phone_number,
      altPickupNumber: data.alternative_phone_number,
    });
    {
      props.onNext && props.onNext();
    }
  }

  return (
    <>
      <div className="flex relative justify-center w-full h-[200px]">
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RequestInputField
                    field={field}
                    placeholder="Sender's name"
                    {...field}
                    Icon={LuUser}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RequestInputField
                    field={field}
                    placeholder="Sender's phone number"
                    {...field}
                    Icon={LuPhone}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="alternative_phone_number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RequestInputField
                    field={undefined}
                    placeholder="Sender's alternative phone number"
                    {...field}
                    Icon={LuPhone}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RequestInputField
                    field={undefined}
                    type={""}
                    placeholder="Sender's email(optional)"
                    {...field}
                    Icon={LuMail}
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
