"use client";

import { useState } from "react";
import { Machine, Order } from "@/types";
import { X } from "lucide-react";

interface CreateOrderFormProps {
  machines: Machine[];
  onSubmit: (order: Omit<Order, "id" | "createdAt" | "timeSpent">) => void;
  onCancel: () => void;
}

export default function CreateOrderForm({
  machines,
  onSubmit,
  onCancel,
}: CreateOrderFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    jobNumber: "",
    quantity: 1,
    panelNumber: "",
    threadColors: [""],
    machineSpeed: 1000,
    dueDays: 0,
    assignedMachine: "",
    status: "pending" as const,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      threadColors: formData.threadColors.filter(
        (color) => color.trim() !== ""
      ),
      assignedMachine: formData.assignedMachine || undefined,
    };

    onSubmit(orderData);
  };

  const addThreadColor = () => {
    setFormData((prev) => ({
      ...prev,
      threadColors: [...prev.threadColors, ""],
    }));
  };

  const updateThreadColor = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      threadColors: prev.threadColors.map((color, i) =>
        i === index ? value : color
      ),
    }));
  };

  const removeThreadColor = (index: number) => {
    if (formData.threadColors.length > 1) {
      setFormData((prev) => ({
        ...prev,
        threadColors: prev.threadColors.filter((_, i) => i !== index),
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Create New Order
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Order title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Number *
              </label>
              <input
                type="text"
                required
                value={formData.jobNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    jobNumber: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Job #"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    quantity: parseInt(e.target.value) || 1,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Panel Number *
              </label>
              <input
                type="text"
                required
                value={formData.panelNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    panelNumber: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Panel #"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Machine Speed (RPM) *
              </label>
              <input
                type="number"
                required
                min="100"
                max="3000"
                value={formData.machineSpeed}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    machineSpeed: parseInt(e.target.value) || 1000,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date (Days from now) *
              </label>
              <select
                value={formData.dueDays}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dueDays: parseInt(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={0}>Today</option>
                <option value={1}>1 day</option>
                <option value={2}>2 days</option>
                <option value={3}>3 days</option>
                <option value={7}>1 week</option>
                <option value={14}>2 weeks</option>
                <option value={30}>1 month</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thread Colors *
            </label>
            <div className="space-y-2">
              {formData.threadColors.map((color, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={color}
                    onChange={(e) => updateThreadColor(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Thread color ${index + 1}`}
                  />
                  {formData.threadColors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeThreadColor(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addThreadColor}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add another color
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign to Machine (Optional)
            </label>
            <select
              value={formData.assignedMachine}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  assignedMachine: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">No machine assigned</option>
              {machines.map((machine) => (
                <option
                  key={machine.id}
                  value={machine.id}
                  disabled={machine.isActive}
                >
                  {machine.name} ({machine.heads} heads){" "}
                  {machine.isActive ? "- Running" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="btn-primary flex-1">
              Create Order
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
