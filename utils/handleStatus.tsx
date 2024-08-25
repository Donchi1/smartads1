import React from "react";


const statusStyles = {
  success: "border-green-500 text-green-500",
  failed: "border-red-600 text-red-600",
  pending: "border-yellow-500 text-yellow-500",
  processing: "border-blue-500 text-blue-500", // Added processing condition
};

const handleStatus = (status: keyof typeof statusStyles) => {
  const baseStyle = "border rounded-full px-2 py-1 capitalise";
  const statusStyle = statusStyles[status] || "border-gray-400 text-gray-400";
  return <span className={`${baseStyle} ${statusStyle}`}>{status}</span>;
};


export default handleStatus