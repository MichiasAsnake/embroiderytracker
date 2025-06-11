"use client";

import { Machine, Order } from "@/types";
import { Calendar, Clock, Palette, Settings } from "lucide-react";

interface OrderListProps {
  orders: Order[];
  machines: Machine[];
  onOrderUpdate: (order: Order) => void;
}

export default function OrderList({
  orders,
  machines,
  onOrderUpdate,
}: OrderListProps) {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDueDateColor = (dueDays: number) => {
    if (dueDays === 0) return "text-red-600 font-semibold";
    if (dueDays === 1) return "text-orange-600 font-medium";
    return "text-gray-600";
  };

  const handleAssignMachine = (order: Order, machineId: string) => {
    const updatedOrder = {
      ...order,
      assignedMachine: machineId,
      status: "pending" as const,
    };
    onOrderUpdate(updatedOrder);
  };

  const handleUnassignMachine = (order: Order) => {
    const updatedOrder = {
      ...order,
      assignedMachine: undefined,
      status: "pending" as const,
    };
    onOrderUpdate(updatedOrder);
  };

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No orders yet. Create your first order to get started.
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Order Details */}
              <div className="lg:col-span-2">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {order.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Job #{order.jobNumber}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span className={getDueDateColor(order.dueDays)}>
                      {order.dueDays === 0
                        ? "Due Today"
                        : `${order.dueDays} day(s)`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-gray-600">{order.quantity} qty</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Palette size={16} className="text-gray-400" />
                    <span className="text-gray-600">
                      Panel {order.panelNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Settings size={16} className="text-gray-400" />
                    <span className="text-gray-600">
                      {order.machineSpeed} RPM
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-sm text-gray-600">
                    Thread Colors: {order.threadColors.join(", ")}
                  </p>
                </div>
              </div>

              {/* Machine Assignment */}
              <div className="border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Machine Assignment
                </h4>

                {order.assignedMachine ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600 font-medium">
                        {
                          machines.find((m) => m.id === order.assignedMachine)
                            ?.name
                        }
                      </span>
                      <button
                        onClick={() => handleUnassignMachine(order)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Unassign
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {machines.map((machine) => (
                      <button
                        key={machine.id}
                        onClick={() => handleAssignMachine(order, machine.id)}
                        disabled={machine.isActive}
                        className="w-full text-left px-3 py-2 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="flex justify-between items-center">
                          <span>{machine.name}</span>
                          <span className="text-xs text-gray-500">
                            {machine.heads} head(s)
                          </span>
                        </div>
                        {machine.isActive && (
                          <div className="text-xs text-orange-600 mt-1">
                            Currently running
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
