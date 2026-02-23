import React from "react";

const ViewDetailsModal = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        <p className="mb-2">
          Order Number: {order?.orderNumber || order?._id?.substring(0, 8)}
        </p>
        <p className="mb-2">Customer: {order?.userId?.fullName || "Unknown"}</p>
        <p className="mb-2">
          Restaurant:{" "}
          {order?.restaurantId?.restaurantName ||
            order?.restaurantId?.fullName ||
            "Unknown"}
        </p>
        <p className="mb-2">Total Amount: ₹{order?.orderValue?.total || 0}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewDetailsModal;