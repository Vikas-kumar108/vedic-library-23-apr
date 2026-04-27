"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle, IndianRupee, CreditCard, Shield, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

import { apiFetch } from "@/lib/api"

declare global {
  interface Window {
    Razorpay: any
  }
}

const donationSchema = z.object({
  donorName: z.string().min(2, "Name must be at least 2 characters"),
  donorEmail: z.string().email("Please enter a valid email"),
  donorPhone: z.string().optional(),
  donorAddress: z.string().optional(),
  donorPAN: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format").optional().or(z.literal("")),
  amount: z.number().min(1, "Amount must be at least 1"),
  isPublic: z.boolean().default(false),
  message: z.string().max(500).optional(),
  needs80G: z.boolean().default(false),
})

type DonationFormData = z.infer<typeof donationSchema>

const PRESET_AMOUNTS = [108, 501, 1008, 5001, 10008]

export function RazorpayCheckout() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1008)
  const [customAmount, setCustomAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const onSubmit = async (data: DonationFormData) => {
    setIsProcessing(true)
    try {
      // 1. Create real order on our gateway
      const orderResponse = await apiFetch("/institutional/dana/orders", {
        method: "POST",
        body: JSON.stringify(data),
      })

      if (!orderResponse.ok) throw new Error("Failed to create order")
      const { order } = await orderResponse.json()

      const loaded = await loadRazorpayScript()
      if (!loaded) throw new Error("Gateway failed to manifest")

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: order.amount,
        currency: order.currency,
        name: "VedicSkills Institutional",
        description: "Contribution to Sacred Mission",
        order_id: order.id,
        handler: async (response: any) => {
          const verifyResponse = await apiFetch("/institutional/dana/verify", {
            method: "POST",
            body: JSON.stringify(response),
          })
          if (verifyResponse.ok) setIsSuccess(true)
        },
        prefill: { name: data.donorName, email: data.donorEmail },
        theme: { color: "#e67e22" },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      toast.error("Gateway Error", { description: "Please use Manual Transfer if this persists." })
    } finally {
      setIsProcessing(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="border-orange-200 bg-orange-50/20">
        <CardContent className="pt-8 text-center space-y-6">
          <div className="size-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto">
            <CheckCircle className="size-10 text-orange-600" />
          </div>
          <h3 className="text-2xl font-serif font-bold italic">Sacred Gratitude</h3>
          <p className="text-slate-500 text-sm">Your contribution has been received by the institutional vaults.</p>
          <Button variant="outline" onClick={() => setIsSuccess(false)} className="rounded-xl px-8">Make Another Donation</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-[#e8e4d9] bg-[#fdfcf5] shadow-xl shadow-slate-200/40">
      <CardHeader>
        <div className="flex items-center gap-3">
          <CreditCard className="size-5 text-orange-600" />
          <CardTitle className="font-serif italic text-2xl">Pay Online</CardTitle>
        </div>
        <CardDescription>Secure payment via UPI, Cards, or NetBanking</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Amount</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleAmountSelect(amt)}
                  className={cn(
                    "h-12 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1",
                    selectedAmount === amt && !customAmount ? "bg-orange-600 text-white" : "bg-slate-50 text-slate-500"
                  )}
                >
                  ₹{amt.toLocaleString()}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Or custom:</span>
               <div className="relative flex-1 max-w-[200px]">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input type="number" placeholder="0.00" value={customAmount} onChange={handleCustomAmountChange} className="pl-10 h-12 bg-slate-50 border-slate-100 rounded-xl font-bold" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name *</label>
              <Input placeholder="Seer Name" className="h-12 bg-slate-50 border-slate-100 rounded-xl" {...register("donorName")} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email *</label>
              <Input type="email" placeholder="seeker@path.com" className="h-12 bg-slate-50 border-slate-100 rounded-xl" {...register("donorEmail")} />
            </div>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-orange-50/20 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox id="online80G" onCheckedChange={(c) => setValue("needs80G", c === true)} />
              <label htmlFor="online80G" className="text-[10px] font-black text-orange-800 uppercase tracking-widest cursor-pointer">Tax Exemption Receipt (80G)</label>
            </div>
            {watch("needs80G") && (
              <div className="space-y-4 pt-2 animate-in slide-in-from-top-2">
                <Input placeholder="PAN NUMBER (ABCDE1234F)" className="uppercase h-12 bg-white border-orange-100 rounded-xl font-mono font-bold" {...register("donorPAN")} />
                <Textarea placeholder="Your full address for the receipt" className="bg-white border-orange-100 rounded-xl" {...register("donorAddress")} />
              </div>
            )}
          </div>

          <Button type="submit" className="w-full h-16 bg-[#e67e22] hover:bg-[#d35400] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em]" disabled={isProcessing}>
            {isProcessing ? <Loader2 className="size-4 animate-spin" /> : "Secure Contribution"}
          </Button>

          <div className="flex items-center justify-center gap-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
            <Shield className="size-3 text-green-500" /> Secured by Razorpay
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
