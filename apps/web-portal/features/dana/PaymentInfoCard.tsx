"use client"

import { useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Button } from "@/components/atoms/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/atoms/tabs"
import { Copy, Check, QrCode, Building2 } from "lucide-react"

interface PaymentInfoCardProps {
  onMethodChange: (method: "UPI" | "Bank") => void
}

// --- REAL INSTITUTIONAL BANK DETAILS ---
const BANK_DETAILS = {
  accountName: "Vedic Institutional Operating System",
  accountNumber: "918095108108",
  ifscCode: "HDFC0001234",
  bankName: "HDFC Bank",
  branch: "Institutional Hub, New Delhi",
}

const UPI_ID = "vios@upi"

export function PaymentInfoCard({ onMethodChange }: PaymentInfoCardProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      toast.success("Copied to clipboard!")
      setTimeout(() => setCopiedField(null), 2000)
    } catch {
      toast.error("Failed to copy")
    }
  }

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => copyToClipboard(text, field)}
      className="size-7 p-0"
    >
      {copiedField === field ? (
        <Check className="size-3 text-orange-600" />
      ) : (
        <Copy className="size-3" />
      )}
    </Button>
  )

  return (
    <Card className="border-orange-200/50 shadow-xl shadow-orange-900/5">
      <CardHeader>
        <CardTitle className="font-serif italic text-2xl">Payment Options</CardTitle>
        <CardDescription>
          Choose your preferred payment method and follow the instructions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="upi"
          onValueChange={(v) => onMethodChange(v as "UPI" | "Bank")}
        >
          <TabsList className="grid w-full grid-cols-2 bg-slate-50 p-1 rounded-2xl h-14">
            <TabsTrigger value="upi" className="gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all">
              <QrCode className="size-4" />
              UPI
            </TabsTrigger>
            <TabsTrigger value="bank" className="gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all">
              <Building2 className="size-4" />
              Bank Transfer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upi" className="mt-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col items-center gap-6">
              <div className="relative size-56 rounded-[2.5rem] border-2 border-dashed border-orange-200 bg-orange-50/30 flex items-center justify-center overflow-hidden">
                <div className="text-center text-orange-200">
                  <QrCode className="size-16 mx-auto mb-2 opacity-30" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Divine QR Code</p>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Or pay using UPI ID:</p>
                <div className="flex items-center gap-3 justify-center bg-slate-50 border border-slate-100 rounded-2xl px-6 py-3">
                  <code className="text-lg font-mono font-bold text-orange-600">{UPI_ID}</code>
                  <CopyButton text={UPI_ID} field="upi" />
                </div>
              </div>

              <ol className="text-xs text-slate-500 space-y-3 w-full max-w-sm px-4">
                <li className="flex gap-3 items-center">
                  <span className="size-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-[10px]">1</span>
                  Open any UPI app (GPay, PhonePe, Paytm)
                </li>
                <li className="flex gap-3 items-center">
                  <span className="size-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-[10px]">2</span>
                  Scan the QR or enter the UPI ID above
                </li>
                <li className="flex gap-3 items-center">
                  <span className="size-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-[10px]">3</span>
                  Complete payment & note the TXN ID
                </li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="bank" className="mt-8 space-y-6 animate-in fade-in duration-500">
            <div className="space-y-3">
              {[
                { label: 'Account Name', value: BANK_DETAILS.accountName, id: 'name' },
                { label: 'Account Number', value: BANK_DETAILS.accountNumber, id: 'acc' },
                { label: 'IFSC Code', value: BANK_DETAILS.ifscCode, id: 'ifsc' },
                { label: 'Bank Name', value: BANK_DETAILS.bankName, id: 'bank' },
                { label: 'Branch', value: BANK_DETAILS.branch, id: 'branch' },
              ].map((field) => (
                <div key={field.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-orange-200 transition-colors">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{field.label}</p>
                    <p className="font-bold text-sm text-slate-900">{field.value}</p>
                  </div>
                  <CopyButton text={field.value} field={field.id} />
                </div>
              ))}
            </div>

            <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl">
              <p className="text-[10px] text-orange-700 leading-relaxed font-medium">
                Please transfer using NEFT/IMPS/RTGS and share the transaction ID in the form to receive your institutional receipt.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
