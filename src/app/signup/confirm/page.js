import React from "react";
import Footer from "@/components/layouts/footer";
import ConfirmPageContents from "@/components/features/auth/signup/confirmpagecontents";

export const metadata = {
  title: "Confirm Code - Aergoos",
  description:
    "Verify your email address with the confirmation code to activate your Aergoos account.",
};

export default function ConfirmPage() {
  return (
    <section className="min-h-screen bg-cream text-black flex flex-col justify-between selection:bg-orange selection:text-cream">
      <ConfirmPageContents />
      <Footer />
    </section>
  );
}
