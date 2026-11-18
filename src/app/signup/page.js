import React from "react";
import Footer from "@/components/layouts/footer";
import SignUpPageContents from "@/components/signin/up/signuppagecontents";

export const metadata = {
  title: "Sign Up - Aergoos",
  description: "Create an account to build and deploy your autonomous AI support agent.",
};

export default function SignUp() {
  return (
    <section className="min-h-screen bg-cream text-black flex flex-col justify-between selection:bg-orange selection:text-cream">
      <SignUpPageContents />
      <Footer />
    </section>
  );
}
