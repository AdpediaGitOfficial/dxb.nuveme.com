import type { Stat } from "@/types";

/**
 * The 2×2 statistics panel beside the About copy.
 *
 * These four figures are the client's, and they replace the set drawn on the
 * artboard (980 homes for rent, 800 to buy, 100 cities covered, AED 3B in
 * deals closed). The panel's geometry is still the drawn one — only the
 * numbers, labels and descriptions changed. Do not "restore" these from Figma.
 *
 * The figures came through as numbers and labels only, so the descriptions
 * under them are written rather than supplied; `properties-sold` keeps the
 * artboard's line, which still fits. Check them before launch.
 */
export const stats: Stat[] = [
  {
    id: "years-of-experience",
    value: "20",
    suffix: "+",
    label: "Years of experience",
    description: "Two decades advising buyers, sellers and investors in Dubai.",
  },
  {
    id: "registered-developers",
    value: "100",
    suffix: "+",
    label: "Registered developers",
    description: "Direct lines to Dubai's registered development partners.",
  },
  {
    id: "happy-clients",
    value: "5000",
    suffix: "+",
    label: "Happy clients",
    description: "Families and investors who found their address with us.",
  },
  {
    id: "properties-sold",
    value: "AED 12B",
    suffix: "+",
    label: "Properties sold",
    description: "Billions in property deals, fueled by unwavering trust.",
  },
];
