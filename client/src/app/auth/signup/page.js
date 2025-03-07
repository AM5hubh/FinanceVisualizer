import { SignupForm } from "@/components/signupform";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
      <div className="flex flex-col gap-3 justify-center items-center h-screen">
        <SignupForm />
        <h1>Already a user? <Link href="/auth/login" className="text-blue-300 hover:text-blue-400">Login</Link></h1>
      </div>

  );
};

export default page;
