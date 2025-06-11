"use client";

import { useState, useEffect } from "react";
import { Machine, Order } from "@/types";
import { formatTime } from "@/utils/storage";
import { Play, Pause, Square } from "lucide-react";

interface MachineCardProps {
  machine: Machine;
  orders: Order[];
  onMachineUpdate: (machine: Machine) => void;
  onOrderUpdate: (order: Order) => void;
}

export default function MachineCard({
  machine,
  orders,
  onMachineUpdate,
  onOrderUpdate,
}: MachineCardProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const currentOrder = orders.find(
    (order) =>
      order.assignedMachine === machine.id && order.status === "in-progress"
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && startTime) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setCurrentTime(machine.elapsedTime + elapsed);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, startTime, machine.elapsedTime]);

  const handleStart = () => {
    if (currentOrder) {
      setIsRunning(true);
      setStartTime(Date.now());

      const updatedMachine = {
        ...machine,
        isActive: true,
        startTime: Date.now(),
      };
      onMachineUpdate(updatedMachine);

      const updatedOrder = { ...currentOrder, status: "in-progress" as const };
      onOrderUpdate(updatedOrder);
    }
  };

  const handlePause = () => {
    if (startTime) {
      const elapsedSession = Math.floor((Date.now() - startTime) / 1000);
      const totalElapsed = machine.elapsedTime + elapsedSession;

      setIsRunning(false);
      setStartTime(null);

      const updatedMachine = {
        ...machine,
        isActive: false,
        elapsedTime: totalElapsed,
        startTime: undefined,
      };
      onMachineUpdate(updatedMachine);

      if (currentOrder) {
        const updatedOrder = {
          ...currentOrder,
          status: "paused" as const,
          timeSpent: currentOrder.timeSpent + elapsedSession,
        };
        onOrderUpdate(updatedOrder);
      }
    }
  };

  const handleStop = () => {
    if (startTime) {
      const elapsedSession = Math.floor((Date.now() - startTime) / 1000);
      const totalElapsed = machine.elapsedTime + elapsedSession;

      setIsRunning(false);
      setStartTime(null);
      setCurrentTime(0);

      const updatedMachine = {
        ...machine,
        isActive: false,
        elapsedTime: 0,
        startTime: undefined,
        currentOrder: undefined,
      };
      onMachineUpdate(updatedMachine);

      if (currentOrder) {
        const updatedOrder = {
          ...currentOrder,
          status: "completed" as const,
          timeSpent: currentOrder.timeSpent + elapsedSession,
          assignedMachine: undefined,
        };
        onOrderUpdate(updatedOrder);
      }
    }
  };

  const displayTime = isRunning ? currentTime : machine.elapsedTime;

  return (
    <div className="card">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">{machine.name}</h3>
          <span className="text-sm text-gray-500">{machine.heads} head(s)</span>
        </div>

        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-gray-900">
            {formatTime(displayTime)}
          </div>
          <div
            className={`text-sm ${
              machine.isActive ? "text-green-600" : "text-gray-500"
            }`}
          >
            {machine.isActive ? "Running" : "Idle"}
          </div>
        </div>

        {currentOrder && (
          <div className="bg-blue-50 p-3 rounded-md">
            <p className="text-sm font-medium text-blue-900">
              {currentOrder.title}
            </p>
            <p className="text-xs text-blue-700">
              Job #{currentOrder.jobNumber}
            </p>
            <p className="text-xs text-blue-700">
              Panel: {currentOrder.panelNumber}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          {!isRunning ? (
            <button
              onClick={handleStart}
              disabled={!currentOrder}
              className="btn-success flex-1 flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play size={16} />
              Start
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="btn-secondary flex-1 flex items-center justify-center gap-1"
            >
              <Pause size={16} />
              Pause
            </button>
          )}

          <button
            onClick={handleStop}
            disabled={!currentOrder}
            className="btn-danger flex-1 flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Square size={16} />
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}
