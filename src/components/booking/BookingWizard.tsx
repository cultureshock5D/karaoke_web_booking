"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AddOn, CustomerInfo, Room, Venue } from "@/types";
import { RoomCard } from "./RoomCard";
import { TimeSlotPicker } from "./TimeSlotPicker";
import { AddOnList } from "./AddOnList";
import { CustomerForm } from "./CustomerForm";
import { BookingSummary } from "./BookingSummary";
import { format } from "date-fns";
import { localToUtcIso } from "@/lib/datetime";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { Button } from "@/components/ui/button";

interface BookingWizardProps {
  venue: Venue;
  rooms: Room[];
  addOns: AddOn[];
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  venue,
  rooms,
  addOns,
}) => {
  const router = useRouter();

  const [selectedRoom, setSelectedRoom] = useState<Room>(rooms[0] || null);
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [selectedTime, setSelectedTime] = useState<string>("19:00");
  const [durationHours, setDurationHours] = useState<number>(2);
  const [guestCount, setGuestCount] = useState<number>(4);
  const [selectedAddOnQuantities, setSelectedAddOnQuantities] = useState<
    Record<string, number>
  >({});
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [unavailableSlotKeys, setUnavailableSlotKeys] = useState<string[]>([]);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState<boolean>(false);

  const handleAddOnQuantityChange = (addOnId: string, qty: number) => {
    setSelectedAddOnQuantities((prev) => ({
      ...prev,
      [addOnId]: qty,
    }));
  };

  const isRoomCompleted = Boolean(selectedRoom);
  const isTimeCompleted = Boolean(selectedDate && selectedTime);
  const isAddOnsCompleted = true; // optional
  const isCustomerCompleted = Boolean(
    customer.name.trim() && customer.email.trim() && customer.phone.trim()
  );

  const steps = [
    { num: "01", label: "Suite", isDone: isRoomCompleted, targetId: "step-room" },
    { num: "02", label: "Schedule", isDone: isTimeCompleted, targetId: "step-time" },
    { num: "03", label: "Hospitality", isDone: isAddOnsCompleted, targetId: "step-addons" },
    { num: "04", label: "Lead Guest", isDone: isCustomerCompleted, targetId: "step-details" },
    { num: "05", label: "Payment Lock", isDone: false, targetId: "step-pay" },
  ];

  const scrollToStep = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmitBooking = async () => {
    setErrorMessage(null);

    // Validations
    if (!selectedRoom) {
      setErrorMessage("Please select a private suite to proceed.");
      scrollToStep("step-room");
      return;
    }

    if (!customer.name.trim() || !customer.email.trim() || !customer.phone.trim()) {
      setErrorMessage(
        "Please provide your name, email, and Philippine mobile number in Section 04."
      );
      scrollToStep("step-details");
      return;
    }

    // Phone format validation
    const phoneClean = customer.phone.replace(/\s+/g, "");
    if (!/^(?:\+63|0)?9\d{9}$/.test(phoneClean)) {
      setErrorMessage(
        "Please enter a valid Philippine mobile number (e.g. 0917 123 4567 or +639171234567)."
      );
      scrollToStep("step-details");
      return;
    }

    setIsLoading(true);

    try {
      const startDateTimeUtc = localToUtcIso(`${selectedDate} ${selectedTime}`);

      const addOnsPayload = Object.entries(selectedAddOnQuantities)
        .filter(([, qty]) => qty > 0)
        .map(([addOnId, quantity]) => ({ addOnId, quantity }));

      const payload = {
        venueId: venue.$id,
        roomId: selectedRoom.$id,
        startDateTime: startDateTimeUtc,
        durationHours,
        guestCount,
        customer: {
          ...customer,
          phone: phoneClean,
        },
        addOns: addOnsPayload,
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.conflictSlots) {
          setUnavailableSlotKeys((prev) => [...prev, ...data.conflictSlots]);
        }
        setErrorMessage(
          data.error ||
            "That slot was just reserved by another guest. Please pick an alternative time."
        );
        setIsLoading(false);
        scrollToStep("step-time");
        return;
      }

      // Successful hold! Redirect to PayMongo Hosted Checkout or success page
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        router.push(`/book/success?ref=${data.bookingReference}`);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Network error occurred. Please try again.";
      setErrorMessage(message);
      setIsLoading(false);
    }
  };

  // Compute pricing for mobile summary bar
  const hourlyRate = selectedRoom
    ? selectedRoom.baseHourlyRate
    : 0;
  const roomPrice = hourlyRate * durationHours;
  const addOnsTotal = addOns.reduce((sum, item) => {
    const qty = selectedAddOnQuantities[item.$id] || 0;
    return sum + item.price * qty;
  }, 0);
  const grandTotal = roomPrice + addOnsTotal;
  let depositDue =
    venue.depositType === "percentage"
      ? Math.round(grandTotal * (venue.depositValue / 100))
      : venue.depositValue;
  depositDue = Math.max(100, Math.min(depositDue, grandTotal));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 lg:pb-16 select-none">
      {/* Horizontal Phase Tracker */}
      <nav aria-label="Booking phases" className="mb-12 pb-6 border-b border-white/[0.08]">
        <ol className="flex items-center justify-between gap-3 overflow-x-auto scrollbar-none py-1">
          {steps.map((st, idx) => {
            const isCurrent =
              (idx === 0 && !isRoomCompleted) ||
              (idx === 1 && isRoomCompleted && !isTimeCompleted) ||
              (idx === 3 && isTimeCompleted && !isCustomerCompleted) ||
              (idx === 4 && isCustomerCompleted);

            return (
              <li key={st.num} className="flex-1 min-w-[120px]">
                <button
                  type="button"
                  onClick={() => scrollToStep(st.targetId)}
                  className="w-full text-left group flex items-center gap-3 focus-visible:outline-none cursor-pointer"
                >
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      st.isDone
                        ? "bg-[#10b981] text-black shadow-[0_0_10px_#10b981]"
                        : isCurrent
                        ? "bg-[#ff551f] text-white shadow-[0_0_15px_rgba(255,85,31,0.5)] scale-105"
                        : "bg-white/[0.04] border border-white/[0.08] text-[#8f909e]"
                    }`}
                  >
                    {st.isDone ? "✓" : st.num}
                  </div>
                  <div>
                    <div
                      className={`text-[9px] uppercase tracking-[0.2em] font-mono transition-colors ${
                        isCurrent
                          ? "text-[#ff773d]"
                          : st.isDone
                          ? "text-emerald-400"
                          : "text-[#8f909e]"
                      }`}
                    >
                      PHASE {st.num}
                    </div>
                    <div
                      className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                        isCurrent || st.isDone ? "text-white" : "text-[#8f909e]"
                      }`}
                    >
                      {st.label}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Global Error Notice */}
      {errorMessage && (
        <div className="mb-8">
          <DoubleBezel
            variant="accent"
            size="sm"
            innerClassName="p-4 bg-red-950/40 border border-red-500/30 flex items-center gap-3 text-red-200 text-xs"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400 font-bold">
              !
            </span>
            <div className="flex-1 font-mono">{errorMessage}</div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-white text-xs px-2 font-mono uppercase cursor-pointer"
            >
              Dismiss
            </button>
          </DoubleBezel>
        </div>
      )}

      {/* Desktop 2-Column Layout: Left Flow, Right Sticky Docket */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: 4 Progressive Stages (col-span-8) */}
        <div className="lg:col-span-8 space-y-16">
          {/* Stage 1: Room Selection */}
          <section id="step-room" className="space-y-6">
            <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff773d]">
                  STAGE 01
                </span>
                <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-white">
                  Select Private Suite
                </h2>
              </div>
              <LuxuryBadge pulse pulseColor="emerald" variant="default" className="text-[9px]">
                3 SUITES AVAILABLE
              </LuxuryBadge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rooms.map((room) => (
                <RoomCard
                  key={room.$id}
                  room={room}
                  isSelected={selectedRoom?.$id === room.$id}
                  onSelect={(r) => {
                    setSelectedRoom(r);
                    setGuestCount(r.capacityMin);
                  }}
                />
              ))}
            </div>
          </section>

          {/* Stage 2: Time & Duration Picker */}
          <section id="step-time" className="space-y-6">
            <div className="border-b border-white/[0.08] pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff773d]">
                STAGE 02
              </span>
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-white">
                Choose Schedule & Hours
              </h2>
            </div>

            <TimeSlotPicker
              openingHour={venue.openingHour}
              closingHour={venue.closingHour}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              selectedTime={selectedTime}
              onTimeChange={setSelectedTime}
              durationHours={durationHours}
              onDurationChange={setDurationHours}
              unavailableSlotKeys={unavailableSlotKeys}
              roomId={selectedRoom?.$id}
            />
          </section>

          {/* Stage 3: Food, Drinks & Microphone Add-ons */}
          <section id="step-addons" className="space-y-6">
            <div className="border-b border-white/[0.08] pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff773d]">
                STAGE 03
              </span>
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-white">
                Bottle Service & Tapas
              </h2>
            </div>

            <AddOnList
              addOns={addOns}
              selectedQuantities={selectedAddOnQuantities}
              onQuantityChange={handleAddOnQuantityChange}
            />
          </section>

          {/* Stage 4: Customer Contact Info */}
          <section id="step-details" className="space-y-6">
            <div className="border-b border-white/[0.08] pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff773d]">
                STAGE 04
              </span>
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-white">
                Lead Guest Credentials
              </h2>
            </div>

            <CustomerForm
              customer={customer}
              onChange={setCustomer}
              guestCount={guestCount}
              onGuestCountChange={setGuestCount}
              maxCapacity={selectedRoom?.capacityMax || 10}
            />
          </section>
        </div>

        {/* Right Column: Sticky Reservation Docket (col-span-4) */}
        <div id="step-pay" className="hidden lg:block lg:col-span-4">
          {selectedRoom ? (
            <BookingSummary
              venue={venue}
              room={selectedRoom}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              durationHours={durationHours}
              addOns={addOns}
              selectedAddOnQuantities={selectedAddOnQuantities}
              onProceedToPayment={handleSubmitBooking}
              isLoading={isLoading}
            />
          ) : (
            <DoubleBezel
              variant="default"
              size="lg"
              className="w-full p-8 text-center"
              innerClassName="p-8 bg-[#08080c] space-y-3"
            >
              <div className="font-heading text-lg font-bold text-white uppercase">
                Select A Suite
              </div>
              <p className="text-xs text-[#8f909e]">
                Choose a soundstage on the left to begin your real-time 15-minute
                cryptographic slot lock.
              </p>
            </DoubleBezel>
          )}
        </div>
      </div>

      {/* Mobile Floating Action Bottom Sheet */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-white/[0.08] bg-[#050507]/95 backdrop-blur-2xl p-4 shadow-[0_-15px_30px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between gap-4">
          <div
            onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
            className="cursor-pointer space-y-0.5"
          >
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#ff773d] flex items-center gap-1">
              <span>Deposit Due Today</span>
              <span>{mobileSummaryOpen ? "▼" : "▲"}</span>
            </div>
            <div className="font-heading text-xl font-bold text-white font-tabular">
              ₱{depositDue.toLocaleString("en-PH")}
            </div>
          </div>

          <Button
            variant="default"
            size="default"
            disabled={isLoading}
            onClick={handleSubmitBooking}
            className="flex-1 font-semibold uppercase tracking-wider text-xs h-12"
          >
            {isLoading ? "Locking..." : "Lock & Checkout ↗"}
          </Button>
        </div>

        {/* Mobile Expanded Summary Drawer */}
        {mobileSummaryOpen && selectedRoom && (
          <div className="mt-4 pt-4 border-t border-white/[0.08] space-y-3 text-xs max-h-[60vh] overflow-y-auto">
            <div className="flex justify-between text-[#8f909e]">
              <span>Suite:</span>
              <span className="text-white font-bold">{selectedRoom.name}</span>
            </div>
            <div className="flex justify-between text-[#8f909e]">
              <span>Date & Time:</span>
              <span className="text-white">
                {selectedDate} @ {selectedTime} ({durationHours}h)
              </span>
            </div>
            <div className="flex justify-between text-[#8f909e]">
              <span>Estimated Total Bill:</span>
              <span className="text-white font-bold font-tabular">
                ₱{grandTotal.toLocaleString("en-PH")}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
