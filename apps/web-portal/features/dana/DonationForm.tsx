"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Checkbox } from "@/components/atoms/checkbox"
import { Textarea } from "@/components/atoms/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card"
import { CheckCircle, IndianRupee, Loader2 } from "lucide-react"

const donationSchema = z.object({
  donorName: z.string().min(2, "Name must be at least 2 characters"),
  donorEmail: z.string().email("Please enter a valid email"),
  donorPhone: z.string().optional(),
  donorAddress: z.string().optional(),
  donorPAN: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format").optional().or(z.literal("")),
  amount: z.number().min(1, "Amount must be at least 1"),
  method: z.enum(["UPI", "Bank"]),
  transactionRef: z.string().min(4, "Transaction reference is required for verification"),
  isPublic: z.boolean().default(false),
  message: z.string().max(500).optional(),
  needs80G: z.boolean().default(false),
})

type DonationFormData = z.infer<typeof donationSchema>

const PRESET_AMOUNTS = [108, 501, 1008, 5001, 10008]

interface DonationFormProps {
  selectedMethod: "UPI" | "Bank"
}

export function DonationForm({ selectedMethod }: DonationFormProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1008)
  const [customAmount, setCustomAmount] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donorName: "",
      donorEmail: "",
      donorPhone: "",
      donorAddress: "",
      donorPAN: "",
      amount: 1008,
      method: selectedMethod,
      isPublic: false,
      message: "",
      needs80G: false,
    },
  })

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
    setValue("amount", amount)
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomAmount(value)
    setSelectedAmount(null)
    const numValue = parseInt(value, 10)
    if (!isNaN(numValue)) {
      setValue("amount", numValue)
    }
  }

  const onSubmit = async (data: DonationFormData) => {
    try {
      // --- CONNECTING TO REAL INSTITUTIONAL GATEWAY ---
      const response = await fetch("http://localhost:4444/institutional/dana/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          paymentMode: 'MANUAL',
          method: selectedMethod,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to submit donation")
      }

      setIsSubmitted(true)
      toast.success("Manifestation Received!", {
        description: "Your manual donation has been recorded. Our team will verify the transaction ID shortly.",
      })
    } catch (error) {
      toast.error("Submission Error", {
        description: error instanceof Error ? error.message : "Please try again later.",
      })
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-orange-200 bg-orange-50/20">
        <CardContent className="pt-8">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="size-20 rounded-full bg-orange-100 flex items-center justify-center">
              <CheckCircle className="size-10 text-orange-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold italic">Sacred Gratitude</h3>
              <p className="text-slate-500 text-sm max-w-xs mx-auto">
                Your manual submission has been manifest. Once verified against our bank records, you will receive your institutional receipt.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsSubmitted(false)}
              className="mt-4 rounded-xl px-8 border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              Make Another Donation
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-slate-100 shadow-xl shadow-slate-200/40">
      <CardHeader>
        <CardTitle className="font-serif italic text-2xl">Complete Your Donation</CardTitle>
        <CardDescription>
          After making the payment via {selectedMethod}, fill in your details below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Amount Selection */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Amount</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {PRESET_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountSelect(amount)}
                  className={cn(
                    "h-12 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1",
                    selectedAmount === amount && !customAmount 
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" 
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  )}
                >
                  ₹{amount.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Or custom:</span>
              <div className="relative flex-1 max-w-[200px]">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input
                  type="number"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="pl-10 h-12 bg-slate-50 border-slate-100 rounded-xl font-bold"
                />
              </div>
            </div>
            {errors.amount && (
              <p className="text-xs text-red-500 font-bold">{errors.amount.message}</p>
            )}
          </div>

          {/* Donor Details */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="donorName" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name *</label>
              <Input
                id="donorName"
                placeholder="Seer Name"
                className="h-12 bg-slate-50 border-slate-100 rounded-xl"
                {...register("donorName")}
              />
              {errors.donorName && <p className="text-[10px] text-red-500 font-bold">{errors.donorName.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="donorEmail" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email *</label>
              <Input
                id="donorEmail"
                type="email"
                placeholder="seeker@path.com"
                className="h-12 bg-slate-50 border-slate-100 rounded-xl"
                {...register("donorEmail")}
              />
              {errors.donorEmail && <p className="text-[10px] text-red-500 font-bold">{errors.donorEmail.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="transactionRef" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">TXN / UTR Reference *</label>
            <Input
              id="transactionRef"
              placeholder="UPI Ref ID or Bank Trans ID"
              className="h-12 bg-orange-50/30 border-orange-100 rounded-xl font-mono font-bold"
              {...register("transactionRef")}
            />
            {errors.transactionRef && <p className="text-[10px] text-red-500 font-bold">{errors.transactionRef.message}</p>}
          </div>

          {/* 80G Receipt Option */}
          <div className="rounded-2xl border border-orange-100 bg-orange-50/20 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="needs80G"
                onCheckedChange={(checked) =>
                  setValue("needs80G", checked === true)
                }
              />
              <label
                htmlFor="needs80G"
                className="text-[10px] font-black text-orange-800 uppercase tracking-widest cursor-pointer"
              >
                I need an 80G Tax Exemption Receipt
              </label>
            </div>
            
            {watch("needs80G") && (
              <div className="space-y-4 pt-2 animate-in slide-in-from-top-2">
                <div className="space-y-2">
                  <label htmlFor="donorPAN" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">PAN Number *</label>
                  <Input
                    id="donorPAN"
                    placeholder="ABCDE1234F"
                    className="uppercase h-12 bg-white border-orange-100 rounded-xl font-mono font-bold"
                    {...register("donorPAN")}
                  />
                  {errors.donorPAN && <p className="text-[10px] text-red-500 font-bold">{errors.donorPAN.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="donorAddress" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Address *</label>
                  <Textarea
                    id="donorAddress"
                    placeholder="Your full address for the receipt"
                    rows={2}
                    className="bg-white border-orange-100 rounded-xl"
                    {...register("donorAddress")}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Blessings / Message</label>
            <Textarea
              id="message"
              placeholder="Share your thoughts with the institution..."
              rows={3}
              className="bg-slate-50 border-slate-100 rounded-xl"
              {...register("message")}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-16 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Manifest Submission"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
