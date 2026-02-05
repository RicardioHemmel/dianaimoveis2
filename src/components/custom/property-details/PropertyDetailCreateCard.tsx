"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CreateActionResponse = {
  success?: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

type PropertyDetailCreateCardProps = {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
  pendingText?: string;
  buttonIcon?: LucideIcon;
  icon: LucideIcon;
  action: (
    prevState: unknown,
    formData: FormData,
  ) => Promise<CreateActionResponse | null>;
  successMessage: string;
  errorMessage: string;
};

export function PropertyDetailCreateCard({
  title,
  description,
  placeholder,
  buttonText,
  pendingText = "Salvando...",
  buttonIcon: ButtonIcon,
  icon: Icon,
  action,
  successMessage,
  errorMessage,
}: PropertyDetailCreateCardProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [state, formAction, pending] = useActionState(action, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(successMessage);
      setName("");
      router.refresh();
      return;
    }

    if (state.success === false) {
      toast.error(state.message || errorMessage);
    }
  }, [state, router, successMessage, errorMessage]);

  const nameError = state?.fieldErrors?.name?.[0];

  return (
    <Card className="lg:col-span-1 white-card h-fit lg:sticky lg:top-20 self-start">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl rounded-full pl-6">
          <Icon className="size-6" />
          {title}
        </CardTitle>

        <CardDescription className="pl-6">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Input
              name="name"
              placeholder={placeholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <p className="text-sm text-destructive">{nameError}</p>}
          </div>
          <Button
            type="submit"
            className="w-full bg-nav-bg-active"
            disabled={pending || !name.trim()}
          >
            {ButtonIcon && <ButtonIcon className="h-4 w-4 mr-2" />}
            {pending ? pendingText : buttonText}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
