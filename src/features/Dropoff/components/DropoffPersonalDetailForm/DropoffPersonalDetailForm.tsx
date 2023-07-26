"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import deliveryMan from "@/assets/delivery-man.svg";
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
  email: z.string().email().optional().or(z.literal("")),
});

export const DropoffPersonalDetailForm = (props: FormStepType) => {
  const [dropoff, setDrop] = useRequestState((state) => [
    state.drop,
    state.setDrop,
  ]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: dropoff.recipientName,
      phone_number: dropoff.recipientNumber,
      alternative_phone_number: dropoff.altRecipientNumber,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setDrop({
      ...dropoff,
      recipientName: data.name,
      recipientNumber: data.phone_number,
      altRecipientNumber: data.alternative_phone_number,
      recipientEmail: data.email,
    });

    props.onNext && props.onNext();
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RequestInputField
                    field={field}
                    placeholder="Receiver's name"
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
                    placeholder="Receiver's phone number"
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
                    placeholder="Receiver's alternative phone number"
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
                    placeholder="Receiver's email(optional)"
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
