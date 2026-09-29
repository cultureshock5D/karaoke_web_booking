'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Clock, XCircle, MapPin, MessageSquare, ArrowRight, Home } from 'lucide-react';
import { BRAND } from '@/lib/design/brand';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref') || 'KTV-7A9-B21';
  const statusParam = searchParams.get('status') || 'confirmed';

  const isConfirmed = statusParam === 'confirmed';
  const isPending = statusParam === 'pending';
  const isFailed = statusParam === 'failed' || statusParam === 'cancelled' || statusParam === 'expired';

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar isSlim={true} />

      <main className="flex-1 flex items-center justify-center p-4 py-16">
        <div className="max-w-xl w-full bg-surface border border-border rounded-[2px] p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Status Badge & Header */}
          <div className="text-center space-y-3">
            {isConfirmed && (
              <>
                <div className="w-16 h-16 bg-success/10 border border-success/30 text-success rounded-[2px] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </div>
                <div className="inline-block px-3 py-1 bg-success/15 border border-success/30 text-success text-[11px] font-mono font-bold uppercase tracking-[0.16em] rounded-[2px]">
                  Booking Confirmed
                </div>
                <h1 className="font-heading font-bold text-2xl sm:text-3xl uppercase tracking-tight text-foreground">
                  Your Room Is Locked
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground font-light max-w-sm mx-auto leading-relaxed">
                  Your deposit has been verified and your private suite is guaranteed.
                </p>
              </>
            )}

            {isPending && (
              <>
                <div className="w-16 h-16 bg-warning/10 border border-warning/30 text-warning rounded-[2px] flex items-center justify-center mx-auto">
                  <Clock className="w-9 h-9 stroke-[2.5]" />
                </div>
                <div className="inline-block px-3 py-1 bg-warning/15 border border-warning/30 text-warning text-[11px] font-mono font-bold uppercase tracking-[0.16em] rounded-[2px]">
                  Payment Pending
                </div>
                <h1 className="font-heading font-bold text-2xl sm:text-3xl uppercase tracking-tight text-foreground">
                  Awaiting Payment Confirmation
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground font-light max-w-sm mx-auto leading-relaxed">
                  Your slot is held while payment verification completes.
                </p>
              </>
            )}

            {isFailed && (
              <>
                <div className="w-16 h-16 bg-destructive/10 border border-destructive/30 text-destructive rounded-[2px] flex items-center justify-center mx-auto">
                  <XCircle className="w-9 h-9 stroke-[2.5]" />
                </div>
                <div className="inline-block px-3 py-1 bg-destructive/15 border border-destructive/30 text-destructive text-[11px] font-mono font-bold uppercase tracking-[0.16em] rounded-[2px]">
                  Reservation Not Completed
                </div>
                <h1 className="font-heading font-bold text-2xl sm:text-3xl uppercase tracking-tight text-foreground">
                  Hold Released
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground font-light max-w-sm mx-auto leading-relaxed">
                  The checkout session was cancelled or the 15-minute hold expired.
                </p>
              </>
            )}
          </div>

          {/* Reference Callout */}
          <div className="bg-[#111111] border border-accent/40 rounded-[2px] p-5 text-center space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono font-semibold">
              Official Booking Reference
            </span>
            <div className="font-heading font-bold text-3xl sm:text-4xl text-accent font-tabular tracking-wider">
              {ref}
            </div>
            <p className="text-[11px] text-muted-foreground font-mono pt-1">
              Present this reference code or your mobile number upon arrival at venue reception.
            </p>
          </div>

          {/* Venue & Self-Service Information */}
          <div className="space-y-4 border-t border-border pt-6 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-heading font-bold text-sm uppercase text-foreground block">
                  {BRAND.name} KTV Lounge
                </span>
                <span className="text-muted-foreground font-light">
                  4th Floor, City Walk Mall, Bonifacio Global City, Taguig, Metro Manila
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-heading font-bold text-sm uppercase text-foreground block">
                  Zero-Account Magic Link Sent
                </span>
                <p className="text-muted-foreground font-light leading-relaxed">
                  A self-service management link has been dispatched to your mobile number and email. You can reschedule, add refreshments, or view room directions anytime without logging in.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Link
              href="/book"
              className="w-full h-12 bg-accent text-background hover:bg-accent/90 font-bold uppercase tracking-wider text-xs rounded-[2px] transition-all flex items-center justify-center gap-2 shadow"
            >
              <span>Book Another Room</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="w-full h-12 border border-border text-foreground hover:bg-surface-raised font-bold uppercase tracking-wider text-xs rounded-[2px] transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4 text-muted-foreground" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground font-mono text-sm">
          Loading booking confirmation...
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}
