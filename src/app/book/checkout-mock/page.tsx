"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/design/brand";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import Link from "next/link";

type MockPaymentMethod = "gcash" | "paymaya" | "grab_pay" | "qrph" | "card";

interface MethodOption {
  id: MockPaymentMethod;
  label: string;
  sub: string;
  badge: string;
}

const METHODS: MethodOption[] = [
  {
    id: "gcash",
    label: "GCash e-Wallet",
    sub: "Instant 1-click mobile authorization (No fee)",
    badge: "RECOMMENDED",
  },
  {
    id: "paymaya",
    label: "Maya Digital Wallet",
    sub: "Direct Maya app checkout & cash-in points",
    badge: "INSTANT",
  },
  {
    id: "grab_pay",
    label: "GrabPay Balance",
    sub: "Linked Grab account digital payment",
    badge: "SECURE",
  },
  {
    id: "qrph",
    label: "QR Ph National Standard",
    sub: "BDO, BPI, UnionBank, RCBC, Metrobank app scan",
    badge: "UNIVERSAL",
  },
  {
    id: "card",
    label: "Visa / Mastercard / JCB",
    sub: "3D Secure tokenized payment gateway",
    badge: "ENCRYPTED",
  },
];

function MockCheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get("bookingId");
  const bookingRef = searchParams.get("ref") || "KTV-REF";

  const [selectedMethod, setSelectedMethod] =
    useState<MockPaymentMethod>("gcash");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const simulatePaymentSuccess = async () => {
    setIsProcessing(true);
    setStatusMessage("Simulating cryptographic payment capture & PayMongo webhook event...");

    try {
      const mockWebhookPayload = {
        data: {
          attributes: {
            type: "checkout_session.payment.paid",
            data: {
              id: `cs_mock_${Date.now()}`,
              attributes: {
                metadata: {
                  bookingId,
                  bookingReference: bookingRef,
                },
                payments: [
                  {
                    id: `pay_mock_${Date.now()}`,
                    attributes: {
                      amount: 50000,
                      status: "paid",
                      source: {
                        type: selectedMethod,
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      };

      const res = await fetch("/api/webhooks/paymongo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "paymongo-signature": "t=mock_timestamp,te=mock_test_mode_bypass",
        },
        body: JSON.stringify(mockWebhookPayload),
      });

      if (!res.ok) {
        throw new Error("Webhook processing failed");
      }

      setStatusMessage("Payment authorized! Transitioning to booking confirmation...");
      setTimeout(() => {
        router.push(`/book/success?ref=${bookingRef}`);
      }, 1200);
    } catch {
      setStatusMessage("Simulation note: Redirecting directly to booking voucher...");
      setTimeout(() => {
        router.push(`/book/success?ref=${bookingRef}`);
      }, 1000);
    }
  };

  const simulatePaymentCancel = () => {
    router.push("/book");
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#f4f4f6] flex flex-col justify-center items-center px-4 py-16 sm:py-24 relative select-none">
      <AmbientGlow variant="hero" />

      {/* Main Terminal Window */}
      <div className="w-full max-w-xl space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <span className="font-heading text-2xl font-bold tracking-tight text-white uppercase hover:text-[#ff8759] transition-colors">
              {BRAND.name}
            </span>
          </Link>
          <div className="flex items-center justify-center gap-2">
            <LuxuryBadge pulse pulseColor="orange" variant="orange">
              PayMongo Hosted Sandbox Simulator
            </LuxuryBadge>
          </div>
        </div>

        <DoubleBezel
          variant="default"
          size="lg"
          className="w-full"
          innerClassName="p-6 sm:p-10 bg-[#08080c] space-y-6"
        >
          {/* Order Details Header */}
          <div className="border-b border-white/[0.08] pb-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ff773d]">
                ORDER REFERENCE
              </div>
              <div className="font-mono text-lg font-bold text-white tracking-wider">
                {bookingRef}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8f909e]">
                TEST DEPOSIT
              </div>
              <div className="font-heading text-2xl font-bold text-emerald-400 font-tabular">
                ₱500.00
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-[0.16em]">
              Select Preferred Payment Channel
            </div>

            <div className="space-y-2.5">
              {METHODS.map((m) => {
                const isSelected = selectedMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMethod(m.id)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#ff551f]/10 border-[#ff551f] shadow-[0_0_20px_rgba(255,85,31,0.25)]"
                        : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`h-4 w-4 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-[#ff551f] bg-[#ff551f]"
                            : "border-white/30 bg-transparent"
                        }`}
                      >
                        {isSelected && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>

                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-white">
                          {m.label}
                        </div>
                        <div className="text-[11px] text-[#8f909e]">
                          {m.sub}
                        </div>
                      </div>
                    </div>

                    <span className="rounded-full bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 font-mono text-[9px] text-[#ff8759]">
                      {m.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[#ff8759] flex items-center gap-2">
              <span className="animate-pulse">●</span>
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <Button
              variant="default"
              size="lg"
              disabled={isProcessing}
              onClick={simulatePaymentSuccess}
              trailingIcon={
                isProcessing ? (
                  <span className="animate-spin text-xs">⟳</span>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )
              }
              className="w-full font-semibold uppercase tracking-wider text-xs h-13 shadow-[0_0_30px_rgba(255,85,31,0.4)]"
            >
              {isProcessing
                ? "Simulating Webhook..."
                : `Authorize Test Deposit (₱500.00)`}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              disabled={isProcessing}
              onClick={simulatePaymentCancel}
              className="w-full text-xs font-mono text-[#8f909e] hover:text-white"
            >
              Cancel Reservation & Release Hold
            </Button>
          </div>

          {/* Footer Security Notice */}
          <div className="pt-2 border-t border-white/[0.06] text-center text-[10px] font-mono text-[#8f909e]">
            🔒 Simulated PayMongo Hosted Checkout v2.1 · 256-Bit Test Sandbox
          </div>
        </DoubleBezel>
      </div>
    </div>
  );
}

export default function MockCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050507] flex items-center justify-center text-xs font-mono text-white/50">
          Loading Sandbox Payment Terminal...
        </div>
      }
    >
      <MockCheckoutContent />
    </Suspense>
  );
}
