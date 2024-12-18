"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { signUpUser } from "@/server-action/user";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

const SignUpForm = () => {
  const router = useRouter();
  const handleSubmit = async (FormData: FormData) => {
    console.log(FormData);
    const name = FormData.get("name") as string | undefined;
    const email = FormData.get("email") as string | undefined;
    const password = FormData.get("password") as string | undefined;
    if (!name || !email || !password) {
      toast.error("please provide all fields");
      return;
    }
    const toastId = toast.loading("Logging in...");
    const res = await signUpUser(name, email, password);
    if (res.success) {
      toast.success("signup successful", { id: toastId });
      router.push("/login");
    } else {
      toast.error(String(res.message), { id: toastId });
    }
  };
  return (
    <form className="space-y-4" action={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" placeholder="Name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="*******"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        SignUp
      </Button>
    </form>
  );
};

export default SignUpForm;
