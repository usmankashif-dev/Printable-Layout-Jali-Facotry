import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function SelectBilla({ billaFormId, billaFormData }) {
  const [billaType, setBillaType] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (billaType) {
      Inertia.get(`/${billaType}`, { quantity, billaFormId, ...billaFormData });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Select Billa Type & Quantity</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Billa Type:</label>
        <select
          className="mb-4 w-full border rounded px-3 py-2"
          value={billaType}
          onChange={e => setBillaType(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="BillaA">Billa A</option>
          <option value="BillaB">Billa B</option>
          <option value="BillaC">Billa C</option>
        </select>
        <label className="block mb-2">Quantity:</label>
        <input
          type="number"
          className="mb-4 w-full border rounded px-3 py-2"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}
