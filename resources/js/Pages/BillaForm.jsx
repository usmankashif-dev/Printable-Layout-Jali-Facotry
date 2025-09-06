import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const inputClass =
  'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 mb-3';
const sectionClass =
  'bg-white rounded-lg shadow-md p-6 mb-6';
const labelClass =
  'block font-medium mb-1';

const BillaForm = () => {
  const [bundle, setBundle] = useState({
    sheets_per_bundle: '',
    date: '',
    packed_by: ''
  });
  const [stock, setStock] = useState({
    khana: '',
    ogauge: '',
    b_width: '',
    jalilenght: '',
    sheet_size: '',
    lot: '',
    machine_id: '',
    party_name: '',
    packed_by: '',
    date: ''
  });
  const [order, setOrder] = useState({
    ogauge: '',
    jalilenght: '',
    cutsheet: '',
    lot: '',
    party_name: ''
  });
  const [billaType, setBillaType] = useState('BillaA');
  const [billaQuantity, setBillaQuantity] = useState('');

  const handleBundleChange = e => {
    const { name, value } = e.target;
    setBundle(prev => ({ ...prev, [name]: value }));
  };
  const handleStockChange = e => {
    const { name, value } = e.target;
    setStock(prev => ({ ...prev, [name]: value }));
  };
  const handleOrderChange = e => {
    const { name, value } = e.target;
    setOrder(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    Inertia.post('/BillaForm', {
      // Bundle
      sheets_per_bundle: bundle.sheets_per_bundle,
      bundle_date: bundle.date,
      bundle_packed_by: bundle.packed_by,
      // Stock
      khana: stock.khana,
      ogauge: stock.ogauge,
      b_width: stock.b_width,
      jalilenght: stock.jalilenght,
      sheet_size: stock.sheet_size,
      lot: stock.lot,
      machine_id: stock.machine_id,
      party_name: stock.party_name,
      stock_packed_by: stock.packed_by,
      stock_date: stock.date,
      // Order
      order_ogauge: order.ogauge,
      order_jalilenght: order.jalilenght,
      cutsheet: order.cutsheet,
      order_lot: order.lot,
      order_party_name: order.party_name,
      // Billa fields
      printed_billa_type: billaType,
      printed_billa_quantity: billaQuantity,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Billa Form</h1>

      <div className={sectionClass}>
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Bundle</h2>
        <label className={labelClass}>Sheets per Bundle
          <input type="number" name="sheets_per_bundle" value={bundle.sheets_per_bundle} onChange={handleBundleChange} required className={inputClass} />
        </label>
        <label className={labelClass}>Date
          <input type="date" name="date" value={bundle.date} onChange={handleBundleChange} required className={inputClass} />
        </label>
        <label className={labelClass}>Packed By
          <input type="text" name="packed_by" value={bundle.packed_by} onChange={handleBundleChange} className={inputClass} />
        </label>
      </div>

      <div className={sectionClass}>
        <h2 className="text-xl font-semibold mb-4 text-green-700">Stock</h2>
        <label className={labelClass}>Khana
          <input type="text" name="khana" value={stock.khana} onChange={handleStockChange} required className={inputClass} />
        </label>
        <label className={labelClass}>Ogauge
          <input type="text" name="ogauge" value={stock.ogauge} onChange={handleStockChange} required className={inputClass} />
        </label>
        <label className={labelClass}>B Width
          <input type="text" name="b_width" value={stock.b_width} onChange={handleStockChange} required className={inputClass} />
        </label>
        <label className={labelClass}>Jalilenght
          <input type="number" name="jalilenght" value={stock.jalilenght} onChange={handleStockChange} required className={inputClass} />
        </label>
        <label className={labelClass}>Sheet Size
          <input type="text" name="sheet_size" value={stock.sheet_size} onChange={handleStockChange} required className={inputClass} />
        </label>
        <label className={labelClass}>Lot
          <input type="text" name="lot" value={stock.lot} onChange={handleStockChange} required className={inputClass} />
        </label>
        <label className={labelClass}>Machine ID
          <input type="text" name="machine_id" value={stock.machine_id} onChange={handleStockChange} required className={inputClass} />
        </label>
        <label className={labelClass}>Party Name
          <input type="text" name="party_name" value={stock.party_name} onChange={handleStockChange} required className={inputClass} />
        </label>
        <label className={labelClass}>Packed By
          <input type="text" name="packed_by" value={stock.packed_by} onChange={handleStockChange} required className={inputClass} />
        </label>
        <label className={labelClass}>Date
          <input type="date" name="date" value={stock.date} onChange={handleStockChange} required className={inputClass} />
        </label>
      </div>

      <div className={sectionClass}>
        <h2 className="text-xl font-semibold mb-4 text-purple-700">Order (Optional Fallbacks)</h2>
        <label className={labelClass}>Ogauge
          <input type="number" name="ogauge" value={order.ogauge} onChange={handleOrderChange} className={inputClass} />
        </label>
        <label className={labelClass}>Jalilenght
          <input type="number" name="jalilenght" value={order.jalilenght} onChange={handleOrderChange} className={inputClass} />
        </label>
        <label className={labelClass}>Cutsheet
          <input type="text" name="cutsheet" value={order.cutsheet} onChange={handleOrderChange} className={inputClass} />
        </label>
        <label className={labelClass}>Lot
          <input type="text" name="lot" value={order.lot} onChange={handleOrderChange} className={inputClass} />
        </label>
        <label className={labelClass}>Party Name
          <input type="text" name="party_name" value={order.party_name} onChange={handleOrderChange} className={inputClass} />
        </label>
      </div>

      <div className={sectionClass}>
        <h2 className="text-xl font-semibold mb-4 text-pink-700">Billa Info</h2>
        <label className={labelClass}>Billa Type
          <select value={billaType} onChange={e => setBillaType(e.target.value)} className={inputClass} required>
            <option value="BillaA">Billa A</option>
            <option value="BillaB">Billa B</option>
            <option value="BillaC">Billa C</option>
          </select>
        </label>
        <label className={labelClass}>Billa Quantity
          <input type="number" value={billaQuantity} onChange={e => setBillaQuantity(e.target.value)} required className={inputClass} />
        </label>
      </div>
      <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition">Submit</button>
    </form>
  );
};

export default BillaForm;
