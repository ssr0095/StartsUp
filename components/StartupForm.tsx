"use client";

import Form from "next/form";
import React, { useActionState, useState } from "react";
import { z } from "zod";
import MDEditor from "@uiw/react-md-editor";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createStartup } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleOnSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createStartup(prevState, formData, pitch);

      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Startup submited",
        });
      }

      router.push(`/startup/${result?._id}`);

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast({
          title: "Error",
          description: "Please check your inputs",
          variant: "destructive",
        });
        return { ...prevState, error: "Validation error", status: "ERROR" };
      }
      toast({
        title: "Error",
        description: "Please check your inputs",
        variant: "destructive",
      });
      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleOnSubmit, {
    error: "",
    state: "INITIAL",
  });

  return (
    <Form action={formAction} className="startup-form">
      <div className="flex flex-col">
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          name="title"
          type="text"
          id="title"
          placeholder="Startup Title"
          className="startup-form_input"
          required
          autoComplete="title"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          name="description"
          id="description"
          placeholder="Startup Description"
          className="startup-form_textarea"
          required
          autoComplete="description"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          name="category"
          type="text"
          id="category"
          placeholder="Startup Category"
          className="startup-form_input"
          required
          autoComplete="category"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          name="link"
          type="link"
          id="link"
          placeholder="Startup Image URL"
          className="startup-form_input"
          required
          autoComplete="link"
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          className="font-outfit"
          data-color-mode="light"
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{
            borderRadius: 10,
            overflow: "hidden",
            fontFamily: "outfit",
          }}
          textareaProps={{
            placeholder: "Briefly explain your startup here",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <Button disabled={isPending} className="startup-form_btn text-white">
        {isPending ? "Submiting..." : "Submit Startup"}
        <Send className="ml-2 size-6" />
      </Button>
    </Form>
  );
};

export default StartupForm;
