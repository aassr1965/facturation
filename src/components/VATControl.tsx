import { Invoice } from "@/types";
import React from "react";

interface VATControlProps {
  invoice: Invoice;
  setIvoice: (invoice: Invoice) => void;
}

const VATControl = ({ invoice, setIvoice }: VATControlProps) => {
  const handleVatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIvoice({
      ...invoice,
      vatActive: e.target.checked,
      vatRate: e.target.checked ? 18 : 0,
    });
  };
  
  const handleVatRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIvoice({
      ...invoice,
      vatRate: parseFloat(e.target.value),
    });
  };


  return (
    <div className="flex items-center rounded-xl">
      {invoice?.vatActive && (
        <input
          type="number"
          value={invoice.vatRate}
          className="input input-sm input-bordered w-16 mr-5"
          onChange={handleVatRateChange}
          min={0}
        />
      )}
      <label className="block text-[10px] lg:text-sm font-bold ">TVA (%)</label>
      <input
        type="checkbox"
        className="toggle toggle-sm ml-2"
        checked={invoice?.vatActive}
        onChange={handleVatChange}
      />
    </div>
  );
};

export default VATControl;
