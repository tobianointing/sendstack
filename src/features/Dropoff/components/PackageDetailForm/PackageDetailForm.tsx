"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import deliveryMan from "@/assets/delivery-man.svg";
import { AuthContext } from "@/contexts/AuthProviders";
import { Button } from "@/features/ui/button";
import { RequestSelectField } from "@/features/ui/components/RequestSelectField";
import { Form, FormField, FormItem, FormMessage } from "@/features/ui/form";
import { useToast } from "@/features/ui/use-toast";
import { useRequestState } from "@/store";
import { FormStepType } from "@/types";
import Image from "next/image";
import { useContext, useState } from "react";
import { LuBox } from "react-icons/lu";
import { fetchEstimatedPrice } from "../../services/fetchEstimatedPrice";

const FormSchema = z.object({
  item_category: z.string().nonempty(),
  item_size: z.string().nonempty(),
});

export const PackageDetailForm = (props: FormStepType) => {
  const [isLoading, setIsLoading] = useState(false);

  const { auth } = useContext(AuthContext);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [pickup, drop, setEstimatedPrices, setDrops] = useRequestState(
    (state) => [
      state.pickup,
      state.drop,
      state.setEstimatedPrices,
      state.setDrops,
    ]
  );

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setDrops(drop);

    setIsLoading(true);
    const jsonData = await fetchEstimatedPrice(pickup, drop, auth);

    if (jsonData) {
      setIsLoading(false);

      if (jsonData?.status === false) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: jsonData?.message,
          duration: 10000,
        });

        return;
      }

      const estimatedPrice = {
        dropoffId: drop.locationCode,
        price: jsonData.data.price,
      };
      setEstimatedPrices(estimatedPrice);
      props.onNext && props.onNext();
    }
  };

  return (
    <>
      <div className="flex relative justify-center w-auto h-[200px]">
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
            name="item_category"
            render={({ field }) => (
              <FormItem>
                <RequestSelectField
                  field={field}
                  items={[
                    { name: "Documents", value: "documents" },
                    { name: "Parcel", value: "parcel" },
                    { name: "Food", value: "food" },
                    { name: "Clothing", value: "clothing" },
                    { name: "Electronics", value: "electronics" },
                    { name: "Others", value: "others" },
                  ]}
                  placeholder="Item Category"
                  Icon={LuBox}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="item_size"
            render={({ field }) => (
              <FormItem>
                <RequestSelectField
                  field={field}
                  items={[
                    { name: "Small than a cartoon of indomie", value: "small" },
                    {
                      name: "Larger than a cartoon of indomie",
                      value: "large",
                    },
                  ]}
                  placeholder="Item Size"
                  Icon={LuBox}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isLoading}>
            Continue
          </Button>
        </form>
      </Form>
    </>
  );
};
