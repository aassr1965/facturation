/* eslint-disable @typescript-eslint/no-unused-vars */
import { Invoice, Totals } from "@/types";
import { FileDown, Layers } from "lucide-react";
import React from "react";

interface InvoicePdfProps {
  invoice: Invoice;
  totals: Totals | null;
}

const InvoicePdf = ({ invoice, totals }: InvoicePdfProps) => {
  return (
    <div className="hidden lg:block mt-4">
      <div className="border-base-300 border-2 border-dashed rounded-xl p-5 ">
        <button className="btn btn-sm btn-accent mb-4">
          Facture PDF
          <FileDown className="w-4" />
        </button>
        <div className="p-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex  flex-col">
              <div>
                <div className="flex items-center gap-2">
                  <div className="bg-accent-content text-accent rounded-full p-2 ">
                    <Layers className="h-6 w-6" />
                  </div>

                  <span className="font-bold text-2xl italic">
                    Fa<span className="text-accent">Toura</span>
                  </span>
                </div>
              </div>
              <h1 className="text-7xl font-bold uppercase">Facture</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePdf;
