export interface Machine {
  id: string;
  name: string;
  heads: number;
  isActive: boolean;
  currentOrder?: string;
  startTime?: number;
  elapsedTime: number;
}

export interface Order {
  id: string;
  title: string;
  jobNumber: string;
  quantity: number;
  panelNumber: string;
  threadColors: string[];
  machineSpeed: number;
  dueDays: number;
  assignedMachine?: string;
  status: "pending" | "in-progress" | "completed" | "paused";
  createdAt: number;
  completedAt?: number;
  timeSpent: number;
}

export interface Statistics {
  totalOrders: number;
  completedOrders: number;
  totalPanels: number;
  totalQuantity: number;
  dailyStats: {
    [date: string]: {
      ordersCompleted: number;
      panelsProduced: number;
      quantityProduced: number;
      machineHours: number;
    };
  };
}

export interface TimerState {
  [machineId: string]: {
    isRunning: boolean;
    startTime: number;
    elapsedTime: number;
  };
}
