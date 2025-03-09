"use client";

import { useToast } from "@/hooks/use-toast";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // email: "",
    password: "",
    username: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors = {};

    // Validate email
    // if (!formData.email) {
    //   newErrors.email = "Email is required";
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.email = "Email address is invalid";
    // }

    // Validate username
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear field-specific error when user starts typing again
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form before submission
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Invalid Form",
        description: "Please correct the errors in the form",
      });
      return;
    }
    // ${process.env.NEXT_PUBLIC_AUTH_PATH}
    setIsLoading(true);
    try {
      const res = await fetch(`https://jsbackend-47kc.onrender.com/api/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(res);
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: data.message || `Error with status ${res.status}`,
        });
        // console.log(data.message || `Error with status ${res.status}`)
        return {
          messsage:
            data.message || `Login failed with status ${res.status}`,
        };
      }

      console.log("Login successful:", data);
      localStorage.setItem("accesstoken", data.data.accessToken);
      localStorage.setItem("refreshtoken", data.data.refreshToken);
      toast({
        title: "Success",
        description: "logged in successfully!",
        variant: "default",
      });
      setFormData({ email: "", password: "", username: "" });
      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Your username" />
          </div>
          <TextInput
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="enter username"
            color={errors.username ? "failure" : undefined}
            helperText={errors.username}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            color={errors.password ? "failure" : undefined}
            helperText={errors.password}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
