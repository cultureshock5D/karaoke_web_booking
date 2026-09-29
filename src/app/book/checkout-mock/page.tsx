'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Smartphone,
  QrCode,
  CreditCard,
  Wallet,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BRAND } from '@/lib/design/brand';
import Link from 'next/link';

type MockPaymentMethod = 'gcash' | 'paymaya' | 'grab_pay' | 'qrph' | 'card';

interface MethodOption {
  id: MockPaymentMethod;
  label: string;
  sub: string;
  icon: React.ElementType;
}

const METHODS: MethodOption[] = [
  { id: 'gcash', label: 'GCash e-Wallet', sub: 'Instant mobile authorization', icon: Smartphone },
  { id: 'paymaya', label: 'Maya Wallet', sub: 'In-app payment confirmation', icon: Wallet },
  { id: 'grab_pay', label: 'GrabPay', sub: 'Linked digital balance', icon: Wallet },
  { id: 'qrph', label: 'QR Ph National QR', sub: 'Scan via any compliant banking app', icon: QrCode },
  { id: 'card', label: 'Debit / Credit Card', sub: 'Visa or Mastercard tokenization', icon: CreditCard },
];

function MockCheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('bookingId');
  const bookingRef = searchParams.get('ref') || 'KTV-REF';

  const [selectedMethod, setSelectedMethod] = useState<MockPaymentMethod>('gcash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const simulatePaymentSuccess = async () => {
    setIsProcessing(true);
    setStatusMessage('Simulating payment capture & PayMongo webhook event...');

    try {
      const mockWebhookPayload = {
        data: {
          attributes: {
            type: 'checkout_session.payment.paid',
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

      await fetch('/api/webhooks/paymongo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockWebhookPayload),
      });

      router.push(`/book/success?ref=${bookingRef}`);
    } catch (err: unknown) {
      setIsProcessing(false);
      const message = err instanceof Error ? err.message : 'Unknown error';
      setStatusMessage('Simulation failed: ' + message);
    }
  };

  const simulatePaymentFailure = async () => {
    setIsProcessing(true);
    setStatusMessage('Simulating payment cancellation & slot hold release...');

    try {
      const mockWebhookPayload = {
        data: {
          attributes: {
            type: 'payment.failed',
            data: {
              id: `cs_mock_${Date.now()}`,
              attributes: {
                metadata: {
                  bookingId,
                  bookingReference: bookingRef,
                },
              },
            },
          },
        },
      };

      await fetch('/api/webhooks/paymongo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockWebhookPayload),
      });

      router.push(`/book?status=cancelled&ref=${bookingRef}`);
    } catch (err: unknown) {
      setIsProcessing(false);
      const message = err instanceof Error ? err.message : 'Unknown error';
      setStatusMessage('Simulation failed: ' + message);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Orange Striped Top Banner */}
      <div className="w-full bg-accent text-background py-2.5 px-4 font-mono text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 shadow">
        <AlertTriangle className="w-4 h-4" />
        <span>SANDBOX ENVIRONMENT · NO REAL PAYMENT CHARGED</span>
        <AlertTriangle className="w-4 h-4" />
      </div>

      {/* Main Card */}
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="max-w-lg w-full bg-surface border border-border rounded-[2px] p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-border pb-4 gap-4">
            <div>
              <Link href="/" className="font-heading font-bold text-xl uppercase tracking-tight text-accent block">
                {BRAND.name}
              </Link>
              <h1 className="font-heading font-bold text-lg uppercase tracking-tight text-foreground mt-1">
                PayMongo Sandbox Simulator
              </h1>
              <p className="text-xs text-muted-foreground font-light mt-0.5">
                Emulates customer checkout completion for booking holds.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-accent bg-accent/10 border border-accent/30 px-2.5 py-1 rounded-[2px] flex-shrink-0">
              {bookingRef}
            </span>
          </div>

          {/* Payment Method Selector as Selectable Rows */}
          <div className="space-y-3">
            <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground block">
              Select Simulated Payment Channel:
            </label>
            <div className="space-y-2" role="radiogroup" aria-label="Simulated payment methods">
              {METHODS.map((method) => {
                const isSelected = selectedMethod === method.id;
                const IconComponent = method.icon;

                return (
                  <button
                    key={method.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-[2px] border text-left transition-all duration-150 outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                      isSelected
                        ? 'border-accent bg-surface-raised ring-1 ring-accent'
                        : 'border-border bg-[#111111] hover:border-border/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-[2px] border ${isSelected ? 'border-accent bg-accent text-background' : 'border-border bg-surface text-muted-foreground'}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-heading font-bold text-sm text-foreground uppercase tracking-tight">
                          {method.label}
                        </div>
                        <div className="text-[11px] text-muted-foreground font-light">
                          {method.sub}
                        </div>
                      </div>
                    </div>
                    <div className={`w-3.5 h-3.5 rounded-full border ${isSelected ? 'border-accent bg-accent' : 'border-border'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Alert */}
          {statusMessage && (
            <div className="p-3.5 rounded-[2px] bg-[#111111] border border-border text-xs text-foreground font-mono">
              {statusMessage}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={simulatePaymentSuccess}
              disabled={isProcessing}
              className="w-full h-12 bg-accent text-background hover:bg-accent/90 font-bold uppercase tracking-wider text-xs rounded-[2px] flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Webhook...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simulate Successful Payment</span>
                </>
              )}
            </Button>

            <Button
              onClick={simulatePaymentFailure}
              disabled={isProcessing}
              variant="outline"
              className="w-full h-12 border-border text-muted-foreground hover:text-destructive hover:border-destructive font-mono text-xs uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              <span>Simulate Expired / Failed Hold</span>
            </Button>
          </div>

          <div className="text-[11px] text-muted-foreground font-light text-center flex items-center justify-center gap-1.5 pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-accent flex-shrink-0" />
            <span>In live operation, guests complete checkout on PayMongo&apos;s secured gateway.</span>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="py-4 text-center text-[10px] uppercase tracking-wider text-muted-foreground/60 font-mono border-t border-border">
        {BRAND.name} Booking Engine Sandbox Simulator
      </div>
    </div>
  );
}

export default function MockCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground font-mono text-sm">
          Loading sandbox simulator...
        </div>
      }
    >
      <MockCheckoutContent />
    </Suspense>
  );
}
