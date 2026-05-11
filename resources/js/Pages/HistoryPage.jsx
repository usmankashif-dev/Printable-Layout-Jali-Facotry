import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const HistoryPage = () => {
  const { records } = usePage().props;
  const [partyFilter, setPartyFilter] = useState("");
  const [lotFilter, setLotFilter] = useState("");
  const [billaTypeFilter, setBillaTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleBillaClick = (type, id) => {
    Inertia.get('/print-billa', { originalOrderId: id, selectedType: type });
  };

  // Filter records by separate filters
  const filteredRecords = records && records.length > 0
    ? records.filter(item => {
        const partyMatch = item.party_name?.toLowerCase().includes(partyFilter.toLowerCase());
        const lotMatch = item.lot?.toLowerCase().includes(lotFilter.toLowerCase());
        const billaTypeMatch = item.printed_billa_type?.toLowerCase().includes(billaTypeFilter.toLowerCase());
        const dateValue = item.bundle_date || item.stock_date || "";
        const dateMatch = dateFilter === "" || dateValue.includes(dateFilter);
        return (
          (partyFilter === "" || partyMatch) &&
          (lotFilter === "" || lotMatch) &&
          (billaTypeFilter === "" || billaTypeMatch) &&
          dateMatch
        );
      })
    : [];

  // Group filtered records by party_name
  const grouped = {};
  if (filteredRecords.length > 0) {
    filteredRecords.forEach(item => {
      const party = item.party_name || 'Unknown';
      if (!grouped[party]) grouped[party] = [];
      grouped[party].push(item);
    });
  }

  // Track which folders are open
  const [openFolders, setOpenFolders] = useState([]);
  const toggleFolder = party => {
    setOpenFolders(prev =>
      prev.includes(party)
        ? prev.filter(p => p !== party)
        : [...prev, party]
    );
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">History</h1>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            value={partyFilter}
            onChange={e => setPartyFilter(e.target.value)}
            placeholder="Filter by Party Name"
            className="w-full px-4 py-2 border rounded shadow"
          />
          <input
            type="text"
            value={lotFilter}
            onChange={e => setLotFilter(e.target.value)}
            placeholder="Filter by Lot"
            className="w-full px-4 py-2 border rounded shadow"
          />
          <input
            type="text"
            value={billaTypeFilter}
            onChange={e => setBillaTypeFilter(e.target.value)}
            placeholder="Filter by Billa Type"
            className="w-full px-4 py-2 border rounded shadow"
          />
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            placeholder="Filter by Date"
            className="w-full px-4 py-2 border rounded shadow"
          />
        </div>
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-4">No history found.</div>
        ) : (
          Object.entries(grouped).map(([party, orders]) => (
            <div key={party} className="mb-8">
              <button
                className={`w-full text-left px-4 py-2 rounded-t font-bold text-lg mb-2 bg-blue-300 hover:bg-blue-400 transition`}
                onClick={() => toggleFolder(party)}
              >
                {openFolders.includes(party) ? '▼' : '►'} {party}
              </button>
              {openFolders.includes(party) && (
                <table className="w-full table-auto border-collapse bg-white rounded-b">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="px-4 py-2 border">Date</th>
                      <th className="px-4 py-2 border">Sheets/Bundle</th>
                      <th className="px-4 py-2 border">Khana</th>
                      <th className="px-4 py-2 border">Lot</th>
                      <th className="px-4 py-2 border">Party Name</th>
                      <th className="px-4 py-2 border">Packed By</th>
                      <th className="px-4 py-2 border">Printed Billa Type</th>
                      <th className="px-4 py-2 border">Printed Quantity</th>
                      <th className="px-4 py-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(item => (
                      <tr key={item.id} className="hover:bg-blue-50">
                        <td className="px-4 py-2 border">{item.bundle_date || item.stock_date}</td>
                        <td className="px-4 py-2 border">{item.sheets_per_bundle}</td>
                        <td className="px-4 py-2 border">{item.khana}</td>
                        <td className="px-4 py-2 border">{item.lot}</td>
                        <td className="px-4 py-2 border">{item.party_name}</td>
                        <td className="px-4 py-2 border">{item.bundle_packed_by || item.stock_packed_by}</td>
                        <td className="px-4 py-2 border">{item.printed_billa_type || '-'}</td>
                        <td className="px-4 py-2 border">{item.printed_billa_quantity || '-'}</td>
                        <td className="px-4 py-2 border text-center">
                          <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleBillaClick('BillaA', item.id)}>Billa A</button>
                          <button className="bg-green-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleBillaClick('BillaB', item.id)}>Billa B</button>
                          <button className="bg-purple-500 text-white px-2 py-1 rounded" onClick={() => handleBillaClick('BillaC', item.id)}>Billa C</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))
        )}
      </div>
    </AuthenticatedLayout>
  );
};

export default HistoryPage;
