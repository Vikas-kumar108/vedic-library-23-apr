"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
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
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle, IndianRupee, CreditCard, Shield } from "lucide-react"

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance
  }
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  handler: (response: RazorpayResponse) => void
  prefill: {
    name: string
    email: string
    contact?: string
  }
  theme: {
    color: string
  }
  modal?: {
    ondismiss?: () => void
  }
}

interface RazorpayInstance {
  open: () => void
  close: () => void
}

interface RazorpayResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
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

const PRESET_AMOUNTS = [500, 1000, 2100, 5000, 11000]

export function RazorpayCheckout() {
  const { data: session } = useSession()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000)
  const [customAmount, setCustomAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [receiptNumber, setReceiptNumber] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donorName: session?.user?.name || "",
      donorEmail: session?.user?.email || "",
      donorPhone: "",
      donorAddress: "",
      donorPAN: "",
      amount: 1000,
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

  // Load Razorpay script
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
      // Load Razorpay script
      const loaded = await loadRazorpayScript()
      if (!loaded) {
        throw new Error("Failed to load payment gateway")
      }

      // Create order
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!orderResponse.ok) {
        const error = await orderResponse.json()
        throw new Error(error.error || "Failed to create order")
      }

      const orderData = await orderResponse.json()

      // Open Razorpay checkout
      const options: RazorpayOptions = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "VedicSkills",
        description: "Donation to VedicSkills Foundation",
        order_id: orderData.orderId,
        handler: async (response) => {
          // Verify payment
          try {
            const verifyResponse = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                donationId: orderData.donationId,
              }),
            })

            if (!verifyResponse.ok) {
              throw new Error("Payment verification failed")
            }

            const verifyData = await verifyResponse.json()
            setReceiptNumber(verifyData.donation.receiptNumber)
            setIsSuccess(true)
            toast.success("Payment successful!", {
              description: "Thank you for your donation. Your receipt has been emailed.",
            })
          } catch {
            toast.error("Payment verification failed", {
              description: "Please contact support if amount was deducted.",
            })
          } finally {
            setIsProcessing(false)
          }
        },
        prefill: orderData.prefill,
        theme: {
          color: "#FF9933",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      setIsProcessing(false)
      toast.error("Something went wrong", {
        description: error instanceof Error ? error.message : "Please try again later.",
      })
    }
  }

  if (isSuccess) {
    return (
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="size-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="size-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-800">Payment Successful!</h3>
              <p className="text-muted-foreground mt-2">
                Thank you for your generous donation. Your receipt has been sent to your email.
              </p>
              {receiptNumber && (
                <p className="text-sm text-green-700 mt-2 font-mono">
                  Receipt: {receiptNumber}
                </p>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setIsSuccess(false)
                setReceiptNumber(null)
              }}
              className="mt-4"
            >
              Make Another Donation
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CreditCard className="size-5 text-primary" />
          <CardTitle>Pay Online</CardTitle>
        </div>
        <CardDescription>
          Secure payment via UPI, Cards, NetBanking, or Wallets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Amount Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Select Amount</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {PRESET_AMOUNTS.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={selectedAmount === amount ? "default" : "outline"}
                  onClick={() => handleAmountSelect(amount)}
                  className="w-full"
                >
                  <IndianRupee className="size-3" />
                  {amount.toLocaleString("en-IN")}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Or enter custom:</span>
              <div className="relative flex-1 max-w-[200px]">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="pl-8"
                />
              </div>
            </div>
            {errors.amount && (
              <p className="text-sm text-destructive">{errors.amount.message}</p>
            )}
          </div>

          {/* Donor Details */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="razorpayDonorName" className="text-sm font-medium">
                Full Name *
              </label>
              <Input
                id="razorpayDonorName"
                placeholder="Your name"
                {...register("donorName")}
                aria-invalid={!!errors.donorName}
              />
              {errors.donorName && (
                <p className="text-sm text-destructive">
                  {errors.donorName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="razorpayDonorEmail" className="text-sm font-medium">
                Email *
              </label>
              <Input
                id="razorpayDonorEmail"
                type="email"
                placeholder="your@email.com"
                {...register("donorEmail")}
                aria-invalid={!!errors.donorEmail}
              />
              {errors.donorEmail && (
                <p className="text-sm text-destructive">
                  {errors.donorEmail.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="razorpayDonorPhone" className="text-sm font-medium">
              Phone (Optional)
            </label>
            <Input
              id="razorpayDonorPhone"
              type="tel"
              placeholder="+91 98765 43210"
              {...register("donorPhone")}
            />
          </div>

          {/* 80G Receipt Option */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="razorpayNeeds80G"
                onCheckedChange={(checked) =>
                  setValue("needs80G", checked === true)
                }
              />
              <label
                htmlFor="razorpayNeeds80G"
                className="text-sm font-medium cursor-pointer"
              >
                I need an 80G Tax Exemption Receipt
              </label>
            </div>
            
            {watch("needs80G") && (
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label htmlFor="razorpayDonorPAN" className="text-sm font-medium">
                    PAN Number *
                  </label>
                  <Input
                    id="razorpayDonorPAN"
                    placeholder="ABCDE1234F"
                    className="uppercase"
                    {...register("donorPAN")}
                    aria-invalid={!!errors.donorPAN}
                  />
                  {errors.donorPAN && (
                    <p className="text-sm text-destructive">
                      {errors.donorPAN.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="razorpayDonorAddress" className="text-sm font-medium">
                    Address *
                  </label>
                  <Textarea
                    id="razorpayDonorAddress"
                    placeholder="Your full address for the receipt"
                    rows={2}
                    {...register("donorAddress")}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="razorpayMessage" className="text-sm font-medium">
              Message (Optional)
            </label>
            <Textarea
              id="razorpayMessage"
              placeholder="Share your thoughts or blessings..."
              rows={2}
              {...register("message")}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="razorpayIsPublic"
              onCheckedChange={(checked) =>
                setValue("isPublic", checked === true)
              }
            />
            <label
              htmlFor="razorpayIsPublic"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Display my name publicly as a supporter
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Spinner className="size-4" />
                Processing...
              </>
            ) : (
              <>
                <Shield className="size-4" />
                Pay Securely
              </>
            )}
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="size-3" />
            <span>Secured by Razorpay | 100% Safe Payment</span>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
