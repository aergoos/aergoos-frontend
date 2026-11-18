"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/container";
import Input from "@/components/features/input";
import Demo from "@/components/ui/demo";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LucideHome } from "lucide-react";

export default function SignInPageContents() {
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // left side
      tl.from(".gsap-left-panel", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        clearProps: "all",
      }).from(
        ".gsap-quote-item",
        {
          opacity: 0,
          y: 10,
          stagger: 0.08,
          duration: 0.45,
          clearProps: "all",
        },
        "<0.1",
      );

      // right side
      tl.from(
        ".gsap-badge",
        {
          opacity: 0,
          y: -10,
          duration: 0.4,
          clearProps: "all",
        },
        "<0.1",
      )
        .from(
          ".gsap-back-btn",
          {
            opacity: 0,
            x: 10,
            duration: 0.4,
            clearProps: "all",
          },
          "<",
        )
        .from(
          ".gsap-heading",
          {
            opacity: 0,
            y: 16,
            duration: 0.45,
            clearProps: "all",
          },
          "-=0.25",
        )
        .from(
          ".gsap-subheading",
          {
            opacity: 0,
            y: 12,
            duration: 0.4,
            clearProps: "all",
          },
          "-=0.2",
        )
        .from(
          ".gsap-form-item",
          {
            opacity: 0,
            y: 14,
            stagger: 0.04,
            duration: 0.45,
            clearProps: "all",
          },
          "-=0.2",
        );
    },
    { scope: containerRef },
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (statusMessage) setStatusMessage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage({
        type: "success",
        text: "Signing you in",
      });
    }, 1200);
  };

  return (
    <main ref={containerRef} className="w-full md:py-40 py-20 overflow-hidden">
      <Container className="px-6 md:px-10 lg:px-10 xl:px-10 2xl:px-0 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-10 items-center">
          {/* left */}
          <div className="hidden md:block w-full h-150 relative gsap-left-panel">
            <Demo
              className="z-50"
              frequency={50}
              speed={0.06}
              waveamplitude={0.6}
              wavescale={5}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 right-4 text-cream">
              <p className="font-JetBrain text-sm md:text-base leading-snug drop-shadow-sm gsap-quote-item">
                &ldquo;Built to know, not to guess.&rdquo;
              </p>
              <p className="font-JetBrainLig text-xs text-cream/90 mt-0.5 gsap-quote-item">
                Grounds every answer in your documents &amp; live APIs.
              </p>
            </div>
          </div>

          {/* right */}
          <div className="w-full max-w-lg mx-auto order-1 lg:order-2">
            <div className="mb-8">
              <div className="flex flex-row justify-between items-center">
                <span className="inline-flex items-center gap-2 text-xs font-JetBrain uppercase tracking-widest text-orange mb-3 gsap-badge">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange"></span>
                  Member Access
                </span>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-JetBrainReg text-black hover:text-orange mb-3 transition-colors cursor-pointer gsap-back-btn group"
                >
                  <LucideHome />
                </Link>
              </div>
              <h1 className="font-JetBrain text-[38px] md:text-[46px] text-black leading-[1.1] tracking-tight gsap-heading">
                Welcome Back
              </h1>
              <p className="font-JetBrainReg text-black/70 text-sm md:text-base mt-2 gsap-subheading">
                Enter your credentials to access your support workspace and
                active agents.
              </p>
            </div>

            {statusMessage && (
              <div
                className={`p-3.5 mb-6 rounded-xl border font-JetBrainReg text-xs flex items-center gap-2.5 ${
                  statusMessage.type === "success"
                    ? "bg-green-500/10 border-green-600/30 text-green-900"
                    : "bg-orange/10 border-orange/30 text-orange"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current"></span>
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="w-full">
              <div className="gsap-form-item">
                <Input
                  label="Email "
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  value={formData.identifier}
                  onChange={handleChange}
                  containerClassName="md:mb-6 mb-4"
                />
              </div>

              <div className="flex flex-col justify-start gap-1 mb-6 relative gsap-form-item">
                <label
                  htmlFor="password"
                  className="font-JetBrainReg text-xs uppercase tracking-wider text-black/60 mb-1"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="text-black font-JetBrainReg bg-transparent outline-none border-b-2 border-black pb-3 pr-10 focus:border-orange w-full duration-300 ease-in-out"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 bottom-3 text-black/60 hover:text-black focus:outline-none p-1 transition-colors cursor-pointer"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* remember me */}
              <div className="flex items-center justify-between mb-8 text-xs font-JetBrainReg gsap-form-item">
                <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-2 border-black bg-cream accent-black focus:ring-0 cursor-pointer"
                  />
                  <span className="text-black/80 group-hover:text-black transition-colors">
                    Remember me
                  </span>
                </label>

                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      "Password reset instructions will be sent to your registered email.",
                    );
                  }}
                  className="text-orange hover:text-black hover:underline transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              {/* submit btn */}
              <div className="gsap-form-item">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-full bg-black text-cream font-JetBrain text-[16px] tracking-tight flex items-center justify-center gap-2.5 hover:bg-orange transition-all duration-300 ease-out cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin"></span>
                      Authenticating...
                    </span>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="relative my-7 flex items-center justify-center gsap-form-item">
                <div className="w-full border-t border-black/20"></div>
                <span className="absolute bg-cream px-3 font-JetBrainLig text-xs text-black/50 uppercase tracking-widest">
                  or continue with
                </span>
              </div>

              {/* sign up */}
              <div className="mt-8 text-center text-xs font-JetBrainLig text-black/70 gsap-form-item">
                <span>Don&apos;t have an account?</span>{" "}
                <Link
                  href="/signup"
                  className="font-JetBrain text-orange hover:text-black hover:underline transition-colors duration-200"
                >
                  Create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </main>
  );
}
