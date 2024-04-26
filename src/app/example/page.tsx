"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { TagsInput } from "@/registry/default/extension/tags-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function ExamplePage() {
  const [values, setValues] = useState<string[]>([]);
  return (
    <main className="py-28 max-w-md w-full mx-auto">
      <Example />
    </main>
  );
}

const form = z.object({
  value: z.array(z.string()).nonempty("Please at least one item"),
});

type Form = z.infer<typeof form>;

const Example = () => {
  const tagsForm = useForm<Form>({
    resolver: zodResolver(form),
    defaultValues: {
      value: [],
    },
  });

  const onSubmit = (data: Form) => {
    toast.success(JSON.stringify(data));
  };
  return (
    <Form {...tagsForm}>
      <form onSubmit={tagsForm.handleSubmit(onSubmit)} className="grid gap-2">
        <FormField
          control={tagsForm.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <TagsInput
                value={field.value}
                onValueChange={field.onChange}
                placeholder="enter your used tech"
              />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
