import { Invoice } from "@/types";
import React from "react";

interface InvoiceInfoProps {
  invoice: Invoice;
  setInvoice: (invoice: Invoice) => void;
}

const InvoiceInfo = ({ invoice, setInvoice }: InvoiceInfoProps) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setInvoice({ ...invoice, [field]: e.target.value });
  };

  console.log(invoice);
  return (
    <div className="flex flex-col h-fit bg-base-200 p-5 rounded-xl mb-4 md:mb-0">
      <div className="space-y-4">
        <h2 className="badge badge-accent">Emetteur</h2>
        <input
          type="text"
          value={invoice?.issuerName}
          className="input input-bordered w-full resize-none"
          placeholder="Entreprise émettrice"
          required
          onChange={(e) => handleInputChange(e, "issuerName")}
          title="Nom de l'entreprise émettrice"
        />
        <textarea
          value={invoice?.issuerAddress}
          placeholder="Adresse de l'entreprise émettrice"
          className="textarea textarea-bordered w-full resize-none h-40"
          rows={5}
          required
          onChange={(e) => handleInputChange(e, "issuerAddress")}
          title="Adresse de l'entreprise émettrice"
        ></textarea>

        <h2 className="badge badge-accent">Client</h2>
        <input
          type="text"
          value={invoice?.clientName}
          className="input input-bordered w-full resize-none"
          placeholder="Entreprise cliente"
          required
          onChange={(e) => handleInputChange(e, "clientName")}
          title="Nom de l'entreprise cliente"
        />
        <textarea
          value={invoice?.clientAddress}
          placeholder="Adresse de l'entreprise cliente"
          className="textarea textarea-bordered w-full resize-none h-40"
          rows={5}
          required
          onChange={(e) => handleInputChange(e, "clientAddress")}
          title="Adresse de l'entreprise cliente"
        ></textarea>

        <h2 className="badge badge-accent">Date de la facture</h2>
        <input
          type="date"
          value={invoice?.invoiceDate}
          className="input input-bordered w-full resize-none"
          required
          onChange={(e) => handleInputChange(e, "invoiceDate")}
          title="Date de la facture"
        />

        <h2 className="badge badge-accent">Date d&apos;échéance</h2>
        <input
          type="date"
          value={invoice?.dueDate}
          className="input input-bordered w-full resize-none"
          required
          onChange={(e) => handleInputChange(e, "dueDate")}
          title="Date d'échéance"
        />
      </div>
    </div>
  );
};

export default InvoiceInfo;
