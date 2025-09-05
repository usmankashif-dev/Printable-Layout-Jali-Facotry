import React from "react";
import { usePage } from "@inertiajs/react";

function PrintBill({ bundle, stock, order = {} }) {
  return (
    <>
      <style>{`
        html,
        body {
          margin: 0;
          padding: 0;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }
        #print-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
          height: 100vh;
          width: 100vw;
        }
        #contentarea {
          transform: rotate(90deg);
          transform-origin: center center;
          max-width: 700px;
        }

        @media print {
          html,
          body {
            height: 100vh !important;
            width: 100vw !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }

          #print-wrapper {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            height: 100vh !important;
            width: 100vw !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          #contentarea {
            transform: none !important;
            max-width: 100vw;
            max-height: 100vh;
            border-width: 2px;
          }
        }

        /* Small helpers used in template (kept as original tailwind classes equivalents) */
        .text-center { text-align: center; }
        .text-[70px] { font-size: 70px; }
        .text-[40px] { font-size: 40px; }
        .text-[32px] { font-size: 32px; }
        .text-[28px] { font-size: 28px; }
        .text-[44px] { font-size: 44px; }
        .font-bold { font-weight: 700; }
        .font-black { font-weight: 900; }
        .tracking-wider { letter-spacing: .05em; }
        .tracking-wide { letter-spacing: .03em; }
        .m-0 { margin: 0; }
        .p-0 { padding: 0; }
        .mb-0 { margin-bottom: 0; }
        .w-full { width: 100%; }
        .h-[30px] { height: 30px; }
        .mt-2 { margin-top: 0.5rem; }
        .flex { display: flex; }
        .items-end { align-items: flex-end; }
        .justify-between { justify-content: space-between; }
        .items-start { align-items: flex-start; }
        .items-center { align-items: center; }
        .font-sans { font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
        .leading-none { line-height: 1; }
        hr { border: none; border-top: 2px solid #000; }
        table { border-collapse: collapse; }
      `}</style>

      <div id="print-wrapper">
        <div
          id="contentarea"
          className="border-[6px] border-dashed border-gray-400 bg-white w-[560px] h-[405px] p-[5px] print:rotate-0"
          style={{ transformOrigin: "center center" }}
        >
          <div id="billa">
            <h1 className="text-[70px] text-center font-bold m-0">
              {stock?.khana ?? ""}
              <span>
                {" "}
                - {stock?.ogauge ?? order?.ogauge ?? ""}g-{stock?.b_width ?? ""}-
                {stock?.jalilenght ?? order?.jalilenght ?? ""}
              </span>
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
          </div>

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

export default function BundleBillaB() {
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

  return <PrintBill bundle={bundle} stock={stock} order={order} />;
}
