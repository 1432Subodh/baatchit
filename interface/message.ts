export interface Messagemain {
  src?: string;
  alt: string;
  fallback: string;
  message: string;
  time: string;
  status: string; // e.g., "Read"
  type: "incoming" | "outgoing";
}

export interface Message {
  id: string;
  src?: string;
  alt?: string;
  fallback?: string;
  message: string;
  time: string;
  rawTime?: string;
  status?: string;
  type: "incoming" | "outgoing";
  from?: string;
  to?: string;
}

export interface Message1 {
  id: string;
  src?: string;
  alt: string;
  fallback: string;
  message: string;
  time: string;
  rawTime?: string;
  status: string;
  type: "incoming" | "outgoing";
  from?: string;
  to?: string;
}

