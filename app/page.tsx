"use client";

import React, { useState, useEffect } from "react";
import { Machine, Order, Statistics } from "@/types";
import { storage } from "@/utils/storage";
import MachineCard from "@/components/MachineCard";
import OrderList from "@/components/OrderList";
import StatisticsCard from "@/components/StatisticsCard";
import CreateOrderForm from "@/components/CreateOrderForm";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [statistics, setStatistics] = useState<Statistics>({
    totalOrders: 0,
    completedOrders: 0,
    totalPanels: 0,
    totalQuantity: 0,
    dailyStats: {},
  });
  const [showCreateOrder, setShowCreateOrder] = useState(false);

  useEffect(() => {
    setMachines(storage.getMachines());
    setOrders(storage.getOrders());
    setStatistics(storage.getStatistics());
  }, []);

  const handleCreateOrder = (
    order: Omit<Order, "id" | "createdAt" | "timeSpent">
  ) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      createdAt: Date.now(),
      timeSpent: 0,
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    storage.saveOrders(updatedOrders);

    // Update statistics
    const updatedStats = {
      ...statistics,
      totalOrders: statistics.totalOrders + 1,
      totalPanels: statistics.totalPanels + parseInt(order.panelNumber),
      totalQuantity: statistics.totalQuantity + order.quantity,
    };
    setStatistics(updatedStats);
    storage.saveStatistics(updatedStats);

    setShowCreateOrder(false);
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    const updatedOrders = orders.map((order) =>
      order.id === updatedOrder.id ? updatedOrder : order
    );
    setOrders(updatedOrders);
    storage.saveOrders(updatedOrders);

    // Update statistics if order is completed
    if (updatedOrder.status === "completed" && !updatedOrder.completedAt) {
      const completedOrder = { ...updatedOrder, completedAt: Date.now() };
      const finalOrders = orders.map((order) =>
        order.id === completedOrder.id ? completedOrder : order
      );
      setOrders(finalOrders);
      storage.saveOrders(finalOrders);

      const updatedStats = {
        ...statistics,
        completedOrders: statistics.completedOrders + 1,
      };
      setStatistics(updatedStats);
      storage.saveStatistics(updatedStats);
    }
  };

  const handleMachineUpdate = (updatedMachine: Machine) => {
    const updatedMachines = machines.map((machine) =>
      machine.id === updatedMachine.id ? updatedMachine : machine
    );
    setMachines(updatedMachines);
    storage.saveMachines(updatedMachines);
  };

  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticsCard
          title="Total Orders"
          value={statistics.totalOrders}
          icon="📋"
        />
        <StatisticsCard
          title="Completed Orders"
          value={statistics.completedOrders}
          icon="✅"
        />
        <StatisticsCard
          title="Total Panels"
          value={statistics.totalPanels}
          icon="🧵"
        />
        <StatisticsCard
          title="Total Quantity"
          value={statistics.totalQuantity}
          icon="📊"
        />
      </div>

      {/* Machines Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Machines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {machines.map((machine) => (
            <MachineCard
              key={machine.id}
              machine={machine}
              orders={orders}
              onMachineUpdate={handleMachineUpdate}
              onOrderUpdate={handleUpdateOrder}
            />
          ))}
        </div>
      </div>

      {/* Orders Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Orders</h2>
          <button
            onClick={() => setShowCreateOrder(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Create Order
          </button>
        </div>
        <OrderList
          orders={orders}
          machines={machines}
          onOrderUpdate={handleUpdateOrder}
        />
      </div>

      {/* Create Order Modal */}
      {showCreateOrder && (
        <CreateOrderForm
          machines={machines}
          onSubmit={handleCreateOrder}
          onCancel={() => setShowCreateOrder(false)}
        />
      )}
    </div>
  );
}
