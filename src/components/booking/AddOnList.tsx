"use client";

import React, { useMemo } from "react";
import { AddOn } from "@/types";
import { DoubleBezel } from "@/components/ui/DoubleBezel";

interface AddOnListProps {
  addOns: AddOn[];
  selectedQuantities: Record<string, number>;
  onQuantityChange: (addOnId: string, newQuantity: number) => void;
}

export const AddOnList: React.FC<AddOnListProps> = ({
  addOns,
  selectedQuantities,
  onQuantityChange,
}) => {
  const groupedAddOns = useMemo(() => {
    const groups: Record<string, AddOn[]> = {
      equipment: [],
      beverage: [],
      food: [],
      party_props: [],
    };

    addOns.forEach((item) => {
      const cat = item.category || "equipment";
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(item);
    });

    return groups;
  }, [addOns]);

  const categoryTitles: Record<string, { title: string; subtitle: string }> = {
    beverage: {
      title: "Chilled Champagne & Craft Bar",
      subtitle: "Pre-stocked in your suite's ice trough upon arrival",
    },
    food: {
      title: "Chef-Prepared Tapas & Hot Platters",
      subtitle: "Freshly made to order from our private culinary kitchen",
    },
    equipment: {
      title: "Studio Microphone & Wireless Add-ons",
      subtitle: "Additional Shure Axient transmitters & vocal monitors",
    },
    party_props: {
      title: "Celebration Essentials",
      subtitle: "VIP party lighting, sparklers, and photo amenities",
    },
  };

  return (
    <div className="space-y-10 select-none">
      {Object.entries(groupedAddOns).map(([catKey, items]) => {
        if (!items || items.length === 0) return null;
        const catInfo = categoryTitles[catKey] || {
          title: "Additional Suite Enhancements",
          subtitle: "Pre-order for seamless arrival",
        };

        return (
          <div key={catKey} className="space-y-4">
            <div className="border-b border-white/[0.06] pb-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff773d]">
                CATEGORY // {catKey.toUpperCase()}
              </div>
              <h4 className="font-heading text-lg font-bold text-white tracking-tight">
                {catInfo.title}
              </h4>
              <p className="text-xs text-[#8f909e]">{catInfo.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((addon) => {
                const qty = selectedQuantities[addon.$id] || 0;
                const isSelected = qty > 0;

                return (
                  <DoubleBezel
                    key={addon.$id}
                    variant={isSelected ? "accent" : "default"}
                    size="sm"
                    className="w-full"
                    innerClassName={`p-4 flex items-center justify-between gap-4 transition-colors duration-500 ${
                      isSelected ? "bg-[#0d0909]" : "bg-[#08080c]"
                    }`}
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-sm text-white truncate">
                          {addon.name}
                        </span>
                        {isSelected && (
                          <span className="rounded-full bg-[#ff551f]/20 border border-[#ff551f]/40 px-2 py-0.5 text-[9px] font-mono text-[#ff8759]">
                            {qty}x Added
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#8f909e] line-clamp-1">
                        {addon.description}
                      </p>
                      <div className="font-heading font-bold text-sm text-[#ff773d] font-tabular pt-0.5">
                        ₱{addon.price.toLocaleString("en-PH")}
                      </div>
                    </div>

                    {/* Haptic Stepper Buttons */}
                    <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] p-1 rounded-full shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          onQuantityChange(addon.$id, Math.max(0, qty - 1))
                        }
                        disabled={qty === 0}
                        aria-label={`Decrease ${addon.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.05] text-white/70 hover:bg-white/[0.1] hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-all duration-300 active:scale-95 cursor-pointer font-bold text-xs"
                      >
                        −
                      </button>

                      <span className="w-5 text-center font-mono text-xs font-bold text-white font-tabular">
                        {qty}
                      </span>

                      <button
                        type="button"
                        onClick={() => onQuantityChange(addon.$id, qty + 1)}
                        aria-label={`Increase ${addon.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ff551f] text-white hover:bg-[#ff6836] transition-all duration-300 active:scale-95 cursor-pointer font-bold text-xs shadow-[0_0_8px_rgba(255,85,31,0.4)]"
                      >
                        +
                      </button>
                    </div>
                  </DoubleBezel>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
