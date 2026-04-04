export interface InfoRow {
  label: string;
  value: string;
  valueColor: string;
}

export interface Stat {
  number: string;
  label: string;
}

export const aboutInfo: InfoRow[] = [
  { label: "Location", value: "Burdwan, India", valueColor: "text-text-primary" },
  { label: "Available", value: "Immediately", valueColor: "text-text-cyan" },
  { label: "Languages", value: "English, Bengali, Hindi", valueColor: "text-text-primary" },
  { label: "Experience", value: "3+ Years", valueColor: "text-text-primary" },
];

export const stats: Stat[] = [
  { number: "3+", label: "Years Exp" },
  { number: "20+", label: "Projects" },
  { number: "10+", label: "Clients" },
];
