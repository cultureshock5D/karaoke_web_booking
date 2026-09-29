'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion, animate } from 'motion/react';

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  value,
  suffix = '',
  duration = 1.2,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    if (isInView) {
      const controls = animate(0, value, {
        duration,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        },
      });

      return () => controls.stop();
    }
  }, [isInView, value, duration, shouldReduceMotion]);

  const outputValue = shouldReduceMotion ? value : (isInView ? displayValue : 0);

  return (
    <span ref={ref} className={`font-tabular ${className}`}>
      {outputValue}
      {suffix}
    </span>
  );
}
