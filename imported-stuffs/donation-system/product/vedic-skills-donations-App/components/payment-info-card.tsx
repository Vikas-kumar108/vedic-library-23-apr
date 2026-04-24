"use client"

import { useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, QrCode, Building2 } from "lucide-react"

interface PaymentInfoCardProps {
  onMethodChange: (method: "UPI" | "Bank") => void
}

const BANK_DETAILS = {
  accountName: "VedicSkills Foundation",
  accountNumber: "XXXX XXXX XXXX 1234",
  ifscCode: "ABCD0001234",
  bankName: "Sample Bank",
  branch: "Main Branch, City",
}

const UPI_ID = "vedicskills@upi"

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
      size="icon-sm"
      onClick={() => copyToClipboard(text, field)}
      className="size-7"
    >
      {copiedField === field ? (
        <Check className="size-3 text-primary" />
      ) : (
        <Copy className="size-3" />
      )}
    </Button>
  )

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle>Payment Options</CardTitle>
        <CardDescription>
          Choose your preferred payment method and follow the instructions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="upi"
          onValueChange={(v) => onMethodChange(v as "UPI" | "Bank")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upi" className="gap-2">
              <QrCode className="size-4" />
              UPI
            </TabsTrigger>
            <TabsTrigger value="bank" className="gap-2">
              <Building2 className="size-4" />
              Bank Transfer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upi" className="mt-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative size-48 rounded-lg border-2 border-dashed border-primary/30 bg-muted/30 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/upi-qr-placeholder.png"
                  alt="UPI QR Code"
                  fill
                  className="object-contain p-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <QrCode className="size-12 mx-auto mb-2 opacity-30" />
                    <p className="text-xs">QR Code</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Or pay using UPI ID:</p>
                <div className="flex items-center gap-2 justify-center bg-muted/50 rounded-lg px-4 py-2">
                  <code className="text-lg font-mono text-primary">{UPI_ID}</code>
                  <CopyButton text={UPI_ID} field="upi" />
                </div>
              </div>

              <ol className="text-sm text-muted-foreground space-y-2 w-full max-w-sm">
                <li className="flex gap-2">
                  <span className="font-medium text-foreground">1.</span>
                  Open any UPI app (GPay, PhonePe, Paytm, etc.)
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-foreground">2.</span>
                  Scan the QR code or enter the UPI ID
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-foreground">3.</span>
                  Enter your donation amount and complete payment
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-foreground">4.</span>
                  Fill the form below with your details
                </li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="bank" className="mt-6">
            <div className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-xs text-muted-foreground">Account Name</p>
                    <p className="font-medium">{BANK_DETAILS.accountName}</p>
                  </div>
                  <CopyButton text={BANK_DETAILS.accountName} field="accountName" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-xs text-muted-foreground">Account Number</p>
                    <p className="font-mono font-medium">{BANK_DETAILS.accountNumber}</p>
                  </div>
                  <CopyButton text={BANK_DETAILS.accountNumber} field="accountNumber" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-xs text-muted-foreground">IFSC Code</p>
                    <p className="font-mono font-medium">{BANK_DETAILS.ifscCode}</p>
                  </div>
                  <CopyButton text={BANK_DETAILS.ifscCode} field="ifscCode" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-xs text-muted-foreground">Bank Name</p>
                    <p className="font-medium">{BANK_DETAILS.bankName}</p>
                  </div>
                  <CopyButton text={BANK_DETAILS.bankName} field="bankName" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-xs text-muted-foreground">Branch</p>
                    <p className="font-medium">{BANK_DETAILS.branch}</p>
                  </div>
                  <CopyButton text={BANK_DETAILS.branch} field="branch" />
                </div>
              </div>

              <ol className="text-sm text-muted-foreground space-y-2">
                <li className="flex gap-2">
                  <span className="font-medium text-foreground">1.</span>
                  Transfer your donation amount using NEFT/IMPS/RTGS
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-foreground">2.</span>
                  Note down the transaction reference number
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-foreground">3.</span>
                  Fill the form below with your details and transaction ID
                </li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
