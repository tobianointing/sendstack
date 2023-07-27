"use client";

import { AuthContext } from "@/contexts/AuthProviders";
import { useContext, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import loginImage from "@/assets/sammy-line-41.png";
import { Button } from "@/features/ui/button";
import { RequestInputField } from "@/features/ui/components/RequestInputField";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/features/ui/form";
import { useToast } from "@/features/ui/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuKey } from "react-icons/lu";

const FormSchema = z.object({
  app_id: z.string().nonempty({ message: "App id is required" }),
  app_secret: z.string().nonempty({ message: "App secret is required" }),
});

export default function Login() {
  const { auth, login, setAuth } = useContext(AuthContext);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      app_id: "",
      app_secret: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>): Promise<void> {
    const res = await login(data.app_id, data.app_secret);

    if (res.status) {
      const userData = {
        balance: res.data.balance,
        app_id: data.app_id,
        app_secret: data.app_secret,
      };
      setAuth(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: res.message,
        duration: 10000,
      });
    }
  }

  useEffect(() => {
    if (auth) {
      console.log("auth", auth);
      router.push("/");
    }
  }, [auth, router]);

  return (
    <div className="w-full md:w-[425px] border p-3 rounded-lg flex flex-col gap-4 mt-16 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50">
      <div className="flex relative justify-center w-full h-[200px]">
        <Image
          src={loginImage}
          fill
          className="object-contain"
          alt="get form illustration"
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="app_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs" htmlFor="app_id">
                  App ID
                </FormLabel>
                <FormControl>
                  <RequestInputField
                    field={field}
                    placeholder="Enter your app id"
                    {...field}
                    Icon={LuKey}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="app_secret"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs" htmlFor="app_secret">
                  App Secret
                </FormLabel>
                <FormControl>
                  <RequestInputField
                    field={undefined}
                    type={""}
                    placeholder="Enter your app secret"
                    {...field}
                    Icon={LuKey}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full mt-4"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Log in
          </Button>
        </form>
      </Form>
    </div>
  );
}
