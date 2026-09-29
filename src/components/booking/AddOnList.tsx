'use client';

import React, { useMemo } from 'react';
import { AddOn } from '@/types';
import { Plus, Minus, Utensils, Mic, Sparkles } from 'lucide-react';

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
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'food':
      case 'beverage':
        return <Utensils className="w-3.5 h-3.5 text-accent" />;
      case 'equipment':
        return <Mic className="w-3.5 h-3.5 text-accent" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-accent" />;
    }
  };

  const groupedAddOns = useMemo(() => {
    const groups: Record<string, AddOn[]> = {
      equipment: [],
      beverage: [],
      food: [],
      party_props: [],
    };

    addOns.forEach((item) => {
      const cat = item.category || 'equipment';
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(item);
    });

    return groups;
  }, [addOns]);

  const categoryTitles: Record<string, string> = {
    equipment: 'Microphones & Equipment',
    beverage: 'Beverages & Beer Buckets',
    food: 'Food & Snack Platters',
    party_props: 'Party Packs & Props',
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedAddOns).map(([catKey, items]) => {
        if (!items || items.length === 0) return null;

        return (
          <div key={catKey} className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-muted-foreground block border-b border-border/60 pb-1">
              {categoryTitles[catKey] || catKey}
            </span>

            <div className="space-y-2">
              {items.map((addOn) => {
                const qty = selectedQuantities[addOn.$id] || 0;
                return (
                  <div
                    key={addOn.$id}
                    className={`flex items-center justify-between p-3.5 rounded-[2px] border transition-all duration-150 ${
                      qty > 0
                        ? 'border-accent bg-surface-raised'
                        : 'border-border bg-surface hover:border-border/80'
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0 pr-3">
                      <div className="p-2 rounded-[2px] bg-[#111111] border border-border flex-shrink-0 mt-0.5">
                        {getCategoryIcon(addOn.category)}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm uppercase tracking-tight text-foreground leading-tight">
                          {addOn.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5 font-light leading-relaxed">
                          {addOn.description}
                        </p>
                        <div className="text-sm font-heading font-bold text-accent mt-1 font-tabular">
                          ₱{addOn.price.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {qty > 0 ? (
                        <>
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${addOn.name}`}
                            onClick={() => onQuantityChange(addOn.$id, qty - 1)}
                            className="w-8 h-8 rounded-[2px] border border-border bg-[#111111] flex items-center justify-center hover:bg-surface-raised text-foreground transition-colors outline-none focus-visible:ring-1 focus-visible:ring-accent"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-heading font-bold text-foreground font-tabular">
                            {qty}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${addOn.name}`}
                            onClick={() =>
                              onQuantityChange(addOn.$id, Math.min(addOn.maxQuantity, qty + 1))
                            }
                            disabled={qty >= addOn.maxQuantity}
                            className="w-8 h-8 rounded-[2px] border border-border bg-[#111111] flex items-center justify-center hover:bg-surface-raised text-foreground transition-colors disabled:opacity-30 outline-none focus-visible:ring-1 focus-visible:ring-accent"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          aria-label={`Add ${addOn.name}`}
                          onClick={() => onQuantityChange(addOn.$id, 1)}
                          className="px-3 py-1.5 rounded-[2px] border border-accent/40 bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider hover:bg-accent hover:text-background transition-colors flex items-center gap-1 outline-none focus-visible:ring-1 focus-visible:ring-accent"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
