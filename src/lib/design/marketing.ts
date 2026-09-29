export const STATS = [
  { value: 0, label: "Double-bookings", suffix: "" }, // guaranteed by DB constraint
  { value: 15, label: "Minute slot hold", suffix: "" }, // 15-minute slot hold window
  { value: 5, label: "Payment methods", suffix: "" },
  { value: 24, label: "Hour online booking", suffix: "/7" },
] as const;
