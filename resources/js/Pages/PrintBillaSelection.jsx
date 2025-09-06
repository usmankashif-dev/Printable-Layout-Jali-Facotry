import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";

export default function PrintBillaSelection({ originalOrderId, selectedType }) {
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState(selectedType || "BillaA");
  const { errors } = usePage().props;

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post("/print-billa", {
      originalOrderId: originalOrderId,
      printed_billa_type: type,
      printed_billa_quantity: quantity,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Print Billa</h2>
      {errors && Object.keys(errors).length > 0 && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {Object.values(errors).map((err, idx) => (
            <div key={idx}>{err}</div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Hidden field for originalOrderId for clarity */}
        <input type="hidden" name="originalOrderId" value={originalOrderId || ""} />
        <div className="mb-4">
          <label className="block mb-2">Billa Type:</label>
          <select
            className="w-full border rounded px-3 py-2 bg-gray-100"
            value={type}
            onChange={e => setType(e.target.value)}
            required
          >
            <option value="BillaA">Billa A</option>
            <option value="BillaB">Billa B</option>
            <option value="BillaC">Billa C</option>
          </select>
        </div>
        <label className="block mb-2">Quantity:</label>
        <input
          type="number"
          className="mb-4 w-full border rounded px-3 py-2"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Save & Continue
        </button>
      </form>
    </div>
  );
}
