"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import deliveryMan from "@/assets/delivery-man.svg";
import { RequestInputField } from "@/features/ui/components/RequestInputField";
import { useRequestState } from "@/store";
import { FormStepType } from "@/types";
import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import Image from "next/image";
import { LuMail, LuPhone, LuUser } from "react-icons/lu";

const FormSchema = z.object({
  name: z.string().nonempty(),
  phone_number: z.string().nonempty(),
  alternative_phone_number: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
});

export const DropoffPersonalDetailForm = (props: FormStepType) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone_number: "",
      alternative_phone_number: "",
    },
  });

  const [dropoff, setDropoffDetails] = useRequestState((state) => [
    state.dropoff_details,
    state.setDropoffDetails,
  ]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setDropoffDetails({
      ...dropoff,
      dropoffName: data.name,
      dropoffNumber: data.phone_number,
      altDropoffNumber: data.alternative_phone_number,
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
