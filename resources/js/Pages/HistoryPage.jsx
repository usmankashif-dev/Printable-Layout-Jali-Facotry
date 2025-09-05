import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';

const HistoryPage = () => {
  const { records } = usePage().props;

  const handleBillaClick = (type, id) => {
    Inertia.get(`/${type}`, { billaFormId: id });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-50 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">History</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-blue-100">
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Sheets/Bundle</th>
            <th className="px-4 py-2 border">Khana</th>
            <th className="px-4 py-2 border">Lot</th>
            <th className="px-4 py-2 border">Party Name</th>
            <th className="px-4 py-2 border">Packed By</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records && records.length > 0 ? (
            records.map(item => (
              <tr key={item.id} className="hover:bg-blue-50">
                <td className="px-4 py-2 border">{item.bundle_date || item.stock_date}</td>
                <td className="px-4 py-2 border">{item.sheets_per_bundle}</td>
                <td className="px-4 py-2 border">{item.khana}</td>
                <td className="px-4 py-2 border">{item.lot}</td>
                <td className="px-4 py-2 border">{item.party_name}</td>
                <td className="px-4 py-2 border">{item.bundle_packed_by || item.stock_packed_by}</td>
                <td className="px-4 py-2 border text-center">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleBillaClick('BillaA', item.id)}>Billa A</button>
                  <button className="bg-green-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleBillaClick('BillaB', item.id)}>Billa B</button>
                  <button className="bg-purple-500 text-white px-2 py-1 rounded" onClick={() => handleBillaClick('BillaC', item.id)}>Billa C</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={7} className="text-center py-4">No history found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;
