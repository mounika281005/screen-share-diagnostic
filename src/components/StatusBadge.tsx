import React from "react";

export type Status =
  | "idle"
  | "requesting"
  | "granted"
  | "denied"
  | "cancelled"
  | "error"
  | "stopped";

interface Props {
  status: Status;
}

export default function StatusBadge({ status }: Props) {
  const base =
    "px-3 py-1 text-xs font-medium rounded-full border transition-all duration-300 ease-in-out";

  const config: Record<
    Status,
    { label: string; styles: string }
  > = {
    idle: {
      label: "Ready",
      styles: "bg-gray-100 border-gray-300 text-gray-600",
    },
    requesting: {
      label: "Requesting Permission",
      styles: "bg-yellow-50 border-yellow-300 text-yellow-600",
    },
    granted: {
      label: "Active",
      styles: "bg-green-50 border-green-300 text-green-600",
    },
    denied: {
      label: "Permission Denied",
      styles: "bg-red-50 border-red-300 text-red-600",
    },
    cancelled: {
      label: "Selection Cancelled",
      styles: "bg-orange-50 border-orange-300 text-orange-600",
    },
    error: {
      label: "Error",
      styles: "bg-red-100 border-red-400 text-red-700",
    },
    stopped: {
      label: "Stopped",
      styles: "bg-gray-100 border-gray-300 text-gray-600",
    },
  };

  const { label, styles } = config[status];

  return (
    <span className={`${base} ${styles}`}>
      {label}
    </span>
  );
}