import React from "react";
import { usePage } from "@inertiajs/react";

function PrintContent({ bundle, stock, order = {} }) {
  return (
    <>
      <style>{`
        @media print {
          #contentarea {
            max-width: 600px;
            margin-top: -5px;
            border-width: 2px;
          }
          body, html {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>
          <a href="/dashboard">Go Back</a>

      <div
        id="contentarea"
        className="max-w-[650px] border-[6px] border-dashed border-gray-400 bg-white mx-auto h-[425px] p-0 print:max-w-[600px] print:mt-[-5px]"
      >
          {/* Centered Logo Overlay */}
          <img
            src="/Images/Jali_tahir-Logo.PNG"
            alt="Logo"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.5,
                zIndex: 10,
                width: '120px',
                height: '120px',
                pointerEvents: 'none',
              }}
          />
        <div id="billa">
          <h1 className="text-[70px] text-center font-extrabold m-0 font-sans">
            {stock?.khana ?? ""}{"\u00A0"}{stock?.sheet_size ?? ""}
          </h1>

          <div id="cline1" className="h-[30px]"></div>

          <table className="w-full mb-0 border-0">
            <tbody>
              <tr>
                <td className="align-top text-center w-1/3 p-0">
                  <h2 className="text-[40px] font-black m-0 tracking-wider font-sans">
                    {bundle?.sheets_per_bundle ?? ""}
                    <span className="text-[22px]">ST</span>
                  </h2>
                </td>

                <td className="align-top text-center w-1/3 p-0">
                  <h2 className="text-[40px] font-black m-0 tracking-wider font-sans">
                    ={(stock?.jalilenght ?? order?.jalilenght ?? 0) *
                      (bundle?.sheets_per_bundle ?? 0)}
                    <span className="text-[22px]">F</span>
                  </h2>
                </td>

                <td className="align-top text-center w-1/3 p-0">
                  <h3 className="text-[40px] font-black m-0 tracking-wider font-sans">
                    {stock?.sheet_size ?? order?.cutsheet ?? ""}
                  </h3>
                  <hr className="my-2 border-t-2 border-black w-full" />
                  <div className="text-[32px] font-black tracking-wide font-sans">
                    {stock?.lot ?? order?.lot ?? ""}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div id="bottombilla" className="mt-2">
            <div className="flex items-end justify-between">
              <div className="flex flex-col items-start">
                <div className="text-[28px] font-black tracking-wide font-sans">
                  Date: {bundle?.date ?? stock?.date ?? ""}
                </div>
                <div className="text-[28px] font-black tracking-wide font-sans">
                  Mch #: {stock?.machine_id ?? ""}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-[44px] font-black leading-none tracking-wider font-sans">
                  {stock?.party_name ?? order?.party_name ?? ""}
                </div>
                <div className="text-[28px] font-black tracking-wide font-sans">
                  Pck By: {stock?.packed_by ?? bundle?.packed_by ?? ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function BundleBillaC() {
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

  return <PrintContent bundle={bundle} stock={stock} order={order} />;
}
