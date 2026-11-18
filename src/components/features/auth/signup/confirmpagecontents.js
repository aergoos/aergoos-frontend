"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/container";
import Demo from "@/components/ui/demo";
import { ArrowLeft, ArrowRight, RotateCw, CheckCircle2 } from "lucide-react";

export default function ConfirmPageContents() {
  const router = useRouter();
  const containerRef = useRef(null);
  const inputRefs = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);
  const [resendTimer, setResendTimer] = useState(45);
  const canResend = resendTimer === 0;


  useEffect(() => {
    if (resendTimer <= 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);


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
        "<0.1"
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
        "<0.1"
      )
        .from(
          ".gsap-back-btn",
          {
            opacity: 0,
            x: 10,
            duration: 0.4,
            clearProps: "all",
          },
          "<"
        )
        .from(
          ".gsap-heading",
          {
            opacity: 0,
            y: 16,
            duration: 0.45,
            clearProps: "all",
          },
          "-=0.25"
        )
        .from(
          ".gsap-subheading",
          {
            opacity: 0,
            y: 12,
            duration: 0.4,
            clearProps: "all",
          },
          "-=0.2"
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
          "-=0.2"
        );
    },
    { scope: containerRef }
  );


  const handleOtpChange = (index, value) => {

    const cleanValue = value.replace(/\D/g, "");
    if (errorMessage) setErrorMessage("");
    if (statusMessage) setStatusMessage(null);

    const updatedOtp = [...otp];

    if (cleanValue.length > 1) {
      const pastedDigits = cleanValue.slice(0, 6).split("");
      pastedDigits.forEach((digit, i) => {
        if (i < 6) updatedOtp[i] = digit;
      });
      setOtp(updatedOtp);
      const nextIndex = Math.min(pastedDigits.length, 5);
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
      return;
    }

    updatedOtp[index] = cleanValue;
    setOtp(updatedOtp);


    if (cleanValue && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };


  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0 && inputRefs.current[index - 1]) {
        // Move to previous and clear it
        const updatedOtp = [...otp];
        updatedOtp[index - 1] = "";
        setOtp(updatedOtp);
        inputRefs.current[index - 1].focus();
      } else if (otp[index]) {
        // Clear current
        const updatedOtp = [...otp];
        updatedOtp[index] = "";
        setOtp(updatedOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasteData) return;

    const updatedOtp = [...otp];
    pasteData.split("").forEach((char, i) => {
      if (i < 6) updatedOtp[i] = char;
    });
    setOtp(updatedOtp);

    const focusIndex = Math.min(pasteData.length, 5);
    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus();
    }
  };


  const handleResend = () => {
    if (!canResend) return;
    setResendTimer(45);
    setErrorMessage("");
    setStatusMessage({
      type: "info",
      text: "A new confirmation code has been sent to your email.",
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = otp.join("");

    if (fullCode.length < 6) {
      setErrorMessage("Please enter the complete 6-digit confirmation code");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setStatusMessage(null);

    console.log("Confirmation Code:", fullCode);

    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage({
        type: "success",
        text: "Code verified successfully! Welcome to Aergoos.",
      });

      setTimeout(() => {
        router.push("/signin");
      }, 1200);
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
              frequency={1}
              speed={0.04}
              waveamplitude={0.4}
              wavescale={1}
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
                  Security Verification · Step 3 of 3
                </span>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1.5 text-xs font-JetBrainReg text-black hover:text-orange mb-3 transition-colors cursor-pointer gsap-back-btn group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                  <span>Back</span>
                </Link>
              </div>
              <h1 className="font-JetBrain text-[38px] md:text-[46px] text-black leading-[1.1] tracking-tight gsap-heading">
                Confirm Code
              </h1>
              <p className="font-JetBrainReg text-black/70 text-sm md:text-base mt-2 gsap-subheading">
                We sent a 6-digit confirmation code to your email. Enter it below to activate your account.
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
                {statusMessage.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-current shrink-0"></span>
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="w-full">
              {/* 6-Digit OTP slots */}
              <div className="gsap-form-item mb-6">
                <label className="block font-JetBrainReg text-xs uppercase tracking-wider text-black/60 mb-3">
                  6-Digit Confirmation Code
                </label>
                <div
                  className="grid grid-cols-6 gap-2 sm:gap-3"
                  onPaste={handlePaste}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`h-14 sm:h-16 text-center font-JetBrain text-2xl sm:text-3xl bg-transparent outline-none border-b-2 transition-all duration-200 ${
                        digit
                          ? "border-black font-semibold text-black"
                          : "border-black/30 text-black focus:border-orange"
                      }`}
                      aria-label={`Digit ${index + 1}`}
                    />
                  ))}
                </div>

                {errorMessage && (
                  <p className="font-JetBrainLig text-xs text-orange mt-3">
                    {errorMessage}
                  </p>
                )}
              </div>

              {/* Resend code row */}
              <div className="flex items-center justify-between mb-8 text-xs font-JetBrainReg gsap-form-item">
                <span className="text-black/60">
                  Didn&apos;t receive the code?
                </span>
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="inline-flex items-center gap-1.5 text-orange hover:text-black hover:underline transition-colors cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Resend code</span>
                  </button>
                ) : (
                  <span className="text-black/40 font-JetBrainLig">
                    Resend code in {resendTimer}s
                  </span>
                )}
              </div>

              {/* Confirm Button */}
              <div className="gsap-form-item">
                <button
                  type="submit"
                  disabled={isLoading || otp.join("").length < 6}
                  className="w-full py-3.5 px-6 rounded-full bg-black text-cream font-JetBrain text-[16px] tracking-tight flex items-center justify-center gap-2.5 hover:bg-orange transition-all duration-300 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin"></span>
                      Verifying Code...
                    </span>
                  ) : (
                    <>
                      <span>Confirm &amp; Activate</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>


            </form>
          </div>
        </div>
      </Container>
    </main>
  );
}
