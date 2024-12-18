"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { loginUser } from "@/server-action/user";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the default form submission behavior
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;
    if (!email || !password) {
      toast.error("please provide all fields");
      return;
    }
    const toastId = toast.loading("Logging in...");
    const error = await loginUser(email, password);
    if (!error) {
      toast.success("Login successful", { id: toastId });
      router.refresh();
    } else {
      toast.error(String(error), { id: toastId });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? (
          <FaSpinner className="animate-spin w-5 h-5 text-muted-foreground" />
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
