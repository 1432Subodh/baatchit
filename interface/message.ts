export interface Message {
  src?: string;
  alt: string;
  fallback: string;
  message: string;
  time: string;
  status: string; // e.g., "Read"
  type: "incoming" | "outgoing";
}
