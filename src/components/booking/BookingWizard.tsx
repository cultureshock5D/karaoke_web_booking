'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AddOn, CustomerInfo, Room, Venue } from '@/types';
import { RoomCard } from './RoomCard';
import { TimeSlotPicker } from './TimeSlotPicker';
import { AddOnList } from './AddOnList';
import { CustomerForm } from './CustomerForm';
import { BookingSummary } from './BookingSummary';
import { format } from 'date-fns';
import { localToUtcIso } from '@/lib/datetime';
import { AlertCircle, Check, ChevronUp, ChevronDown } from 'lucide-react';

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
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [selectedTime, setSelectedTime] = useState<string>('19:00');
  const [durationHours, setDurationHours] = useState<number>(2);
  const [guestCount, setGuestCount] = useState<number>(4);
  const [selectedAddOnQuantities, setSelectedAddOnQuantities] = useState<Record<string, number>>({});
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    notes: '',
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
  const isAddOnsCompleted = true; // optional step
  const isCustomerCompleted = Boolean(customer.name.trim() && customer.email.trim() && customer.phone.trim());

  const steps = [
    { num: '01', label: 'Room', isDone: isRoomCompleted, targetId: 'step-room' },
    { num: '02', label: 'Time', isDone: isTimeCompleted, targetId: 'step-time' },
    { num: '03', label: 'Add-ons', isDone: isAddOnsCompleted, targetId: 'step-addons' },
    { num: '04', label: 'Details', isDone: isCustomerCompleted, targetId: 'step-details' },
    { num: '05', label: 'Pay', isDone: false, targetId: 'step-pay' },
  ];

  const scrollToStep = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmitBooking = async () => {
    setErrorMessage(null);

    // Basic frontend validations
    if (!selectedRoom) {
      setErrorMessage('Please select a karaoke room to proceed.');
      scrollToStep('step-room');
      return;
    }

    if (!customer.name.trim() || !customer.email.trim() || !customer.phone.trim()) {
      setErrorMessage('Please fill in your name, email, and Philippine mobile number in the details section.');
      scrollToStep('step-details');
      return;
    }

    // Phone format validation
    const phoneClean = customer.phone.replace(/\s+/g, '');
    if (!/^(?:\+63|0)?9\d{9}$/.test(phoneClean)) {
      setErrorMessage('Please enter a valid Philippine mobile number (e.g. 09171234567 or +639171234567).');
      scrollToStep('step-details');
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

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.conflictSlots) {
          setUnavailableSlotKeys((prev) => [...prev, ...data.conflictSlots]);
        }
        setErrorMessage(
          data.error || 'That slot was just reserved by another guest. Please pick an alternative time.'
        );
        setIsLoading(false);
        scrollToStep('step-time');
        return;
      }

      // Successful hold! Redirect to PayMongo Hosted Checkout or mock
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        router.push(`/book/success?ref=${data.bookingReference}`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Network error occurred. Please try again.';
      setErrorMessage(message);
      setIsLoading(false);
    }
  };

  // Compute pricing for mobile bottom bar
  const roomPrice = selectedRoom ? selectedRoom.baseHourlyRate * durationHours : 0;
  const addOnsTotal = addOns.reduce((sum, item) => {
    const qty = selectedAddOnQuantities[item.$id] || 0;
    return sum + item.price * qty;
  }, 0);
  const grandTotal = roomPrice + addOnsTotal;
  let depositDue = venue.depositType === 'percentage'
    ? Math.round(grandTotal * (venue.depositValue / 100))
    : venue.depositValue;
  depositDue = Math.max(100, Math.min(depositDue, grandTotal));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-28 lg:pb-16">
      {/* Horizontal Step Indicator */}
      <nav aria-label="Booking steps" className="mb-10 pb-6 border-b border-border">
        <ol className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none py-1">
          {steps.map((st, idx) => {
            const isCurrent =
              (idx === 0 && !isRoomCompleted) ||
              (idx === 1 && isRoomCompleted && !isTimeCompleted) ||
              (idx === 3 && isTimeCompleted && !isCustomerCompleted) ||
              (idx === 4 && isCustomerCompleted);

            return (
              <li key={st.num} className="flex-1 min-w-[100px]">
                <button
                  type="button"
                  onClick={() => scrollToStep(st.targetId)}
                  className="w-full text-left group flex items-center gap-2.5 focus-visible:outline-none"
                >
                  <div
                    className={`w-6 h-6 rounded-[2px] flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                      st.isDone
                        ? 'bg-foreground text-background'
                        : isCurrent
                        ? 'bg-accent text-background'
                        : 'bg-surface border border-border text-muted-foreground'
                    }`}
                  >
                    {st.isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : st.num}
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-[0.14em] font-semibold transition-colors ${
                      isCurrent
                        ? 'text-accent'
                        : st.isDone
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {st.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Error / Conflict Banner */}
      {errorMessage && (
        <div
          role="alert"
          className="mb-8 p-4 rounded-[2px] bg-destructive/15 border border-destructive/40 text-foreground flex items-start gap-3 animate-in fade-in duration-150"
        >
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono font-bold text-destructive block">
              Booking Hold Notice
            </span>
            <div className="text-sm font-medium leading-relaxed">{errorMessage}</div>
          </div>
        </div>
      )}

      {/* Two Column Layout on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form & Selection Steps (7 cols) */}
        <div className="lg:col-span-7 space-y-12">
          {/* Step 1: Room Selection */}
          <section id="step-room" className="space-y-4">
            <div className="space-y-1">
              <span className="eyebrow text-accent block">Step 01</span>
              <h2 className="font-heading font-bold text-2xl uppercase tracking-tight text-foreground">
                Choose Your Room
              </h2>
            </div>

            {rooms.length === 0 ? (
              <div className="p-8 text-center bg-surface border border-border rounded-[2px] space-y-2">
                <p className="text-sm text-muted-foreground">No rooms currently available for online booking.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rooms.map((room) => (
                  <RoomCard
                    key={room.$id}
                    room={room}
                    isSelected={selectedRoom?.$id === room.$id}
                    onSelect={(r) => {
                      setSelectedRoom(r);
                      if (guestCount > r.capacityMax) setGuestCount(r.capacityMax);
                    }}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Step 2: Date & Time Schedule */}
          <section id="step-time" className="space-y-4 pt-8 border-t border-border">
            <div className="space-y-1">
              <span className="eyebrow text-accent block">Step 02</span>
              <h2 className="font-heading font-bold text-2xl uppercase tracking-tight text-foreground">
                Select Schedule & Duration
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

          {/* Step 3: Drinks & Food Add-Ons */}
          {addOns.length > 0 && (
            <section id="step-addons" className="space-y-4 pt-8 border-t border-border">
              <div className="space-y-1">
                <span className="eyebrow text-accent block">Step 03</span>
                <h2 className="font-heading font-bold text-2xl uppercase tracking-tight text-foreground">
                  Food & Drinks Add-Ons
                </h2>
                <p className="text-xs text-muted-foreground font-light">
                  Pre-ordered refreshments are placed in your room prior to check-in.
                </p>
              </div>

              <AddOnList
                addOns={addOns}
                selectedQuantities={selectedAddOnQuantities}
                onQuantityChange={handleAddOnQuantityChange}
              />
            </section>
          )}

          {/* Step 4: Customer Contact Info */}
          <section id="step-details" className="space-y-4 pt-8 border-t border-border">
            <div className="space-y-1">
              <span className="eyebrow text-accent block">Step 04</span>
              <h2 className="font-heading font-bold text-2xl uppercase tracking-tight text-foreground">
                Guest Contact Details
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

        {/* Right Column: Sticky Summary on Desktop (5 cols) */}
        <div id="step-pay" className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24">
          {selectedRoom && (
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
          )}
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar & Drawer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111111]/95 backdrop-blur-md border-t border-border p-4 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
            className="flex flex-col text-left focus-visible:outline-none"
          >
            <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
              <span>Total Deposit</span>
              {mobileSummaryOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </div>
            <div className="font-heading font-bold text-xl text-accent font-tabular">
              ₱{depositDue.toLocaleString()}
            </div>
          </button>

          <button
            type="button"
            onClick={handleSubmitBooking}
            disabled={isLoading}
            className="px-5 py-3 bg-accent text-background font-bold text-xs uppercase tracking-wider rounded-[2px] transition-all disabled:opacity-40"
          >
            {isLoading ? 'Locking...' : 'Pay Deposit →'}
          </button>
        </div>

        {/* Expandable Mobile Drawer */}
        {mobileSummaryOpen && selectedRoom && (
          <div className="pt-4 mt-4 border-t border-border max-h-[70vh] overflow-y-auto">
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
          </div>
        )}
      </div>
    </div>
  );
};
