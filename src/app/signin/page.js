import React from "react";
import Footer from "@/components/layouts/footer";
import SignInPageContents from "@/components/features/auth/signin/signinpagecontents";


export const metadata = {
  title: "Sign In - Aergoos",
  description: "Sign in to access your Aergoos support workspace and active agents.",
};

export default function SignIn() {
  return (
    <section className="min-h-screen bg-cream text-black flex flex-col justify-between selection:bg-orange selection:text-cream">
      <SignInPageContents />
      <Footer />
    </section>
  );
}
