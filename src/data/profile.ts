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
  { label: "Location", value: "Kolkata, India", valueColor: "text-text-primary" },
  { label: "Available", value: "Immediately", valueColor: "text-text-cyan" },
  { label: "Languages", value: "English, Bengali, Hindi", valueColor: "text-text-primary" },
  { label: "Experience", value: "< 1 Year", valueColor: "text-text-primary" },
];

export const stats: Stat[] = [
  { number: "Junior", label: "Engineer" },
  { number: "20+", label: "Projects" },
  { number: "10+", label: "Clients" },
];
