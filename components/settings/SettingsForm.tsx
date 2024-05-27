"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom-ui/Delete";

const formSchema = z.object({
  rate: z.coerce.number(),
});

interface SettingsFormProps {
  initialData?: SettingType | null;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          rate: 0,
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/settings/${initialData._id}`
        : "/api/settings";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Settings ${initialData ? "updated" : "created"}`);
        window.location.href = "/settings";
        router.push("/settings");
      }
    } catch (err) {
      console.log("[settings_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Rate</p>
          <Delete id={initialData._id} item="settings" />
        </div>
      ) : (
        <p className="text-heading2-bold">Update Rate</p>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="USD Rate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-10">
            <Button
              type="button"
              onClick={() => (window.location.href = "/settings")}
              className="bg-red-1 text-white"
            >
              Discard
            </Button>
            <Button type="submit" className="bg-blue-1 text-white">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SettingsForm;
