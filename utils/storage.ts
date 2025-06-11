import { Machine, Order, Statistics, TimerState } from "@/types";

const STORAGE_KEYS = {
  MACHINES: "embroidery_machines",
  ORDERS: "embroidery_orders",
  STATISTICS: "embroidery_statistics",
  TIMERS: "embroidery_timers",
};

// Initialize default machines
const defaultMachines: Machine[] = [
  {
    id: "single1",
    name: "Single Head 1",
    heads: 1,
    isActive: false,
    elapsedTime: 0,
  },
  {
    id: "single2",
    name: "Single Head 2",
    heads: 1,
    isActive: false,
    elapsedTime: 0,
  },
  {
    id: "six1",
    name: "6 Head Machine",
    heads: 6,
    isActive: false,
    elapsedTime: 0,
  },
  {
    id: "eight1",
    name: "8 Head Machine",
    heads: 8,
    isActive: false,
    elapsedTime: 0,
  },
];

const defaultStatistics: Statistics = {
  totalOrders: 0,
  completedOrders: 0,
  totalPanels: 0,
  totalQuantity: 0,
  dailyStats: {},
};

export const storage = {
  // Machines
  getMachines(): Machine[] {
    if (typeof window === "undefined") return defaultMachines;
    const stored = localStorage.getItem(STORAGE_KEYS.MACHINES);
    return stored ? JSON.parse(stored) : defaultMachines;
  },

  saveMachines(machines: Machine[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.MACHINES, JSON.stringify(machines));
  },

  // Orders
  getOrders(): Order[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return stored ? JSON.parse(stored) : [];
  },

  saveOrders(orders: Order[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },

  // Statistics
  getStatistics(): Statistics {
    if (typeof window === "undefined") return defaultStatistics;
    const stored = localStorage.getItem(STORAGE_KEYS.STATISTICS);
    return stored ? JSON.parse(stored) : defaultStatistics;
  },

  saveStatistics(statistics: Statistics): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(statistics));
  },

  // Timers
  getTimers(): TimerState {
    if (typeof window === "undefined") return {};
    const stored = localStorage.getItem(STORAGE_KEYS.TIMERS);
    return stored ? JSON.parse(stored) : {};
  },

  saveTimers(timers: TimerState): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.TIMERS, JSON.stringify(timers));
  },
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const getTodayString = (): string => {
  return new Date().toISOString().split("T")[0];
};
