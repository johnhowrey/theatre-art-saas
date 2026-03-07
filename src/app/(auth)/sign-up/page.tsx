import { Suspense } from "react";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata = { title: "Sign Up - StageArt" };

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
}
