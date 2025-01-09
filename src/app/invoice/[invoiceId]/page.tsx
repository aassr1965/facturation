"use client";
import { deleteInvoice, getInvoiceById, updateInvoice } from "@/app/actions";
import InvoiceInfo from "@/components/InvoiceInfo";
import InvoiceLines from "@/components/InvoiceLines";
import InvoicePdf from "@/components/InvoicePdf";
import VATControl from "@/components/VATControl";
import Wrapper from "@/components/Wrapper";
import { Invoice, Totals } from "@/types";
import { Save, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: Promise<{ invoiceId: string }> }) => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [initialInvoice, setInitialInvoice] = useState<Invoice | null>(null);
  const [totals, setTotals] = useState<Totals | null>(null);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const fetchInvoice = async () => {
    try {
      const { invoiceId } = await params;
      const fetchedInvoice = await getInvoiceById(invoiceId);
      if (fetchedInvoice) {
        setInvoice(fetchedInvoice);
        setInitialInvoice(fetchedInvoice);
      }
    } catch (error) {
      console.error("Récupération facture", error);
    }
  };

  const handleSave = async () => {
    if (!invoice) return;
    setIsLoading(true);
    try {
      await updateInvoice(invoice);
      const updatedInvoice = await getInvoiceById(invoice.id);
      if (updatedInvoice) {
        setInvoice(updatedInvoice);
        setInitialInvoice(updatedInvoice);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la facture :", error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Etes-vous sûr de vouloir supprimer cette facture ?"
    );
    if (confirmed) {
      try {
        if (invoice) {
          await deleteInvoice(invoice?.id);
          router.push('/')
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de la facture :", error);
      }
    }
  };
  
  useEffect(() => {
    fetchInvoice();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!invoice) return;
    const ht = invoice.lines.reduce(
      (acc, { quantity, unitPrice }) => acc + quantity * unitPrice,
      0
    );

    const vat = invoice.vatActive ? ht * (invoice.vatRate / 100) : 0;
    setTotals({ totalHT: ht, totalVAT: vat, totalTTC: ht + vat });
  }, [invoice]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = parseInt(e.target.value);
    if (invoice) {
      const updatedInvoice = { ...invoice, status: newStatus };
      setInvoice(updatedInvoice);
    }
  };

  useEffect(() => {
    setIsSaveDisabled(
      JSON.stringify(invoice) === JSON.stringify(initialInvoice)
    );
  }, [invoice, initialInvoice]);

  if (!invoice)
    return (
      <div className="flex justify-center items-center h-screen w-full gap-5">
        <div className="animate-spin rounded-full border-8 border-blue-500 border-t-transparent w-8 h-8 md:h-12 md:w-12" />
        <span className="font-bold text-3xl md:text-6xl  text-blue-500">
          Chargement
        </span>
      </div>
    );
  return (
    <Wrapper>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <p className="badge badge-ghost badge-lg">
          <span className="font-bold">Facture n°&nbsp;</span>
          <span className="text-emerald-600">{invoice?.id.toUpperCase()}</span>
        </p>
        <div className="flex md:mt-0 mt-4">
          <select
            className="select select-sm select-bordered w-full"
            value={invoice?.status}
            onChange={handleStatusChange}
          >
            <option value={1}>Brouillon</option>
            <option value={2}>En attente</option>
            <option value={3}>Payée</option>
            <option value={4}>Annulée</option>
            <option value={5}>Impayée</option>
          </select>
          <button
            className="btn btn-sm btn-accent ml-4"
            disabled={isSaveDisabled || isLoading}
            onClick={handleSave}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                Sauvegarder
                <Save className="w-4 ml-2" />
              </>
            )}
          </button>
          <button className="btn btn-sm btn-accent ml-4" onClick={handleDelete}>
            <Trash className="w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full md:gap-4">
        <div className="flex w-full md:w-1/3 flex-col">
          <div className="mb-4 bg-base-200 rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="badge badge-accent text-[10px] lg:text-sm">
                Totaux
              </div>
              <VATControl invoice={invoice} setIvoice={setInvoice} />
            </div>
            <div className="flex flex-col">
              {/* <span className="flex justify-between">
                <span className="font-bold">TVA :</span> (
                {invoice?.vatActive ? `${invoice?.vatRate}` : "0"} %)
              </span> */}
              <span className="flex justify-between">
                <span className="font-bold">Total HT : </span>
                {totals?.totalHT.toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                })}{" "}
                DA
              </span>
              <span className="flex justify-between">
                <span className="font-bold">Total TVA :</span>
                {totals?.totalVAT.toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                })}{" "}
                DA
              </span>
              <span className="flex justify-between">
                <span className="font-bold">Total TTC :</span>
                {totals?.totalTTC.toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                })}{" "}
                DA
              </span>
            </div>
          </div>
          <InvoiceInfo invoice={invoice} setInvoice={setInvoice} />
        </div>
        <div className="flex w-full md:w-2/3 flex-col">
          <InvoiceLines invoice={invoice} setInvoice={setInvoice} />
          <InvoicePdf invoice={invoice} totals={totals}/>
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;
