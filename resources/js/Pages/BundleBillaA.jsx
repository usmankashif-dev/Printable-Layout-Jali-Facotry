import React from "react";
import { usePage } from "@inertiajs/react";

function PrintWrapper({ bundle, stock, order = {} }) {
  return (
    <>
      <style>{`
        #print-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
          overflow: hidden;
          padding-top: 60px;
          height: 100vh;
        }

        @media print {
          html,
          body {
            height: 100vh;
            width: 100vw;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          #print-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100vw;
            padding: 0;
            margin: 0;
          }

          #wrapper {
            transform: none !important;
            max-width: 100%;
            max-height: 100%;
            margin: 0 auto;
            border-width: 2px;
          }
        }
      `}</style>

      <div
        id="print-wrapper"
        className="flex items-center justify-center bg-[#f5f5f5] overflow-hidden pt-16 h-screen"
      >
          {/* Centered Logo Overlay */}
          <img
            src="/Images/Jali_tahir-Logo.PNG"
            alt="Logo"
        style={{
          position: 'absolute',
          left: '42%', 
          top: '60%',
          transform: 'translate(-50%, -50%) rotate(90deg)',
          opacity: 0.5,
          zIndex: 10,
          width: '110px', // smaller size
          height: '110px',
          pointerEvents: 'none',
        }}
          />
        <div
          id="wrapper"
          className="w-[450px] border-4 border-dashed border-gray-400 bg-white print:rotate-0"
          style={{ transform: "rotate(90deg)", transformOrigin: "center center" }}
        >
          <div
            className="bg-black text-white text-4xl font-extrabold py-3 tracking-wider flex items-center justify-between px-9"
            style={{ fontSize: "50px" }}
          >
            <span>{stock?.khana ?? ""}</span>
            <span>
              - {stock?.ogauge ?? order?.ogauge ?? ""}g-{stock?.b_width ?? ""}-
              {stock?.jalilenght ?? order?.jalilenght ?? ""}
            </span>
          </div>

          <div className="flex justify-around items-center py-6 px-6">
            <div className="text-4xl font-black">
              {bundle?.sheets_per_bundle ?? ""}
              <span className="text-[22px]">St</span>
            </div>

            <div className="text-4xl font-black">
              ={(stock?.jalilenght ?? order?.jalilenght ?? 0) *
                (bundle?.sheets_per_bundle ?? 0)}
              <span className="text-[22px]">F</span>
            </div>

            <div className="text-center">
              <div className="text-4xl font-black">
                {stock?.sheet_size ?? order?.cutsheet ?? ""}
              </div>
              <hr className="my-2 border-t-2 border-black w-[90%] mx-auto" />
              <div className="text-2xl font-black">{stock?.lot ?? order?.lot ?? ""}</div>
            </div>
          </div>

          <div className="flex justify-between px-6 pb-6">
            <div className="flex flex-col gap-1 text-left text-xl font-bold">
              <div>Date: {bundle?.date ?? stock?.date ?? ""}</div>
              <div>Mch #: {stock?.machine_id ?? ""}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {stock?.party_name ?? order?.party_name ?? ""}
              </div>
              <div className="text-lg font-bold">
                Pck By: {stock?.packed_by ?? bundle?.packed_by ?? ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function BundleBillaA() {
  const { billaFormData } = usePage().props;

  const bundle = billaFormData
    ? {
        sheets_per_bundle: billaFormData.sheets_per_bundle,
        date: billaFormData.bundle_date,
        packed_by: billaFormData.bundle_packed_by,
      }
    : {};

  const stock = billaFormData
    ? {
        khana: billaFormData.khana,
        ogauge: billaFormData.ogauge,
        b_width: billaFormData.b_width,
        jalilenght: billaFormData.jalilenght,
        sheet_size: billaFormData.sheet_size,
        lot: billaFormData.lot,
        machine_id: billaFormData.machine_id,
        party_name: billaFormData.party_name,
        packed_by: billaFormData.stock_packed_by,
        date: billaFormData.stock_date,
      }
    : {};

  const order = billaFormData
    ? {
        ogauge: billaFormData.order_ogauge,
        jalilenght: billaFormData.order_jalilenght,
        cutsheet: billaFormData.cutsheet,
        lot: billaFormData.order_lot,
        party_name: billaFormData.order_party_name,
      }
    : {};

  return <PrintWrapper bundle={bundle} stock={stock} order={order} />;
}
