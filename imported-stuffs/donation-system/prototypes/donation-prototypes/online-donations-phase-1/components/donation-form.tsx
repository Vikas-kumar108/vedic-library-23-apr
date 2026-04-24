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
import { CheckCircle, IndianRupee } from "lucide-react"

const donationSchema = z.object({
  donorName: z.string().min(2, "Name must be at least 2 characters"),
  donorEmail: z.string().email("Please enter a valid email"),
  donorPhone: z.string().optional(),
  donorAddress: z.string().optional(),
  donorPAN: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format").optional().or(z.literal("")),
  amount: z.number().min(1, "Amount must be at least 1"),
  method: z.enum(["UPI", "Bank"]),
  transactionRef: z.string().optional(),
  isPublic: z.boolean().default(false),
  message: z.string().max(500).optional(),
  needs80G: z.boolean().default(false),
})

type DonationFormData = z.infer<typeof donationSchema>

const PRESET_AMOUNTS = [100, 500, 1000, 2100, 5000]

interface DonationFormProps {
  selectedMethod: "UPI" | "Bank"
}

export function DonationForm({ selectedMethod }: DonationFormProps) {
  const { data: session } = useSession()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(500)
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
      donorName: session?.user?.name || "",
      donorEmail: session?.user?.email || "",
      donorPhone: "",
      donorAddress: "",
      donorPAN: "",
      amount: 500,
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
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          method: selectedMethod,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to submit donation")
      }

      setIsSubmitted(true)
      toast.success("Thank you for your donation!", {
        description:
          "We have received your submission. Our team will verify and confirm your donation shortly.",
      })
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          error instanceof Error ? error.message : "Please try again later.",
      })
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="size-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Thank You!</h3>
              <p className="text-muted-foreground mt-2">
                Your donation submission has been received. We will verify the
                payment and send you a confirmation email shortly.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsSubmitted(false)}
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
        <CardTitle>Complete Your Donation</CardTitle>
        <CardDescription>
          After making the payment via {selectedMethod}, fill in your details
          below
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
              <label htmlFor="donorName" className="text-sm font-medium">
                Full Name *
              </label>
              <Input
                id="donorName"
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
              <label htmlFor="donorEmail" className="text-sm font-medium">
                Email *
              </label>
              <Input
                id="donorEmail"
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
            <label htmlFor="donorPhone" className="text-sm font-medium">
              Phone (Optional)
            </label>
            <Input
              id="donorPhone"
              type="tel"
              placeholder="+91 98765 43210"
              {...register("donorPhone")}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="transactionRef" className="text-sm font-medium">
              Transaction Reference / UTR (Optional)
            </label>
            <Input
              id="transactionRef"
              placeholder="Enter UPI reference or bank transaction ID"
              {...register("transactionRef")}
            />
            <p className="text-xs text-muted-foreground">
              Helps us verify your payment faster
            </p>
          </div>

          {/* 80G Receipt Option */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="needs80G"
                onCheckedChange={(checked) =>
                  setValue("needs80G", checked === true)
                }
              />
              <label
                htmlFor="needs80G"
                className="text-sm font-medium cursor-pointer"
              >
                I need an 80G Tax Exemption Receipt
              </label>
            </div>
            
            {watch("needs80G") && (
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label htmlFor="donorPAN" className="text-sm font-medium">
                    PAN Number *
                  </label>
                  <Input
                    id="donorPAN"
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
                  <label htmlFor="donorAddress" className="text-sm font-medium">
                    Address *
                  </label>
                  <Textarea
                    id="donorAddress"
                    placeholder="Your full address for the receipt"
                    rows={2}
                    {...register("donorAddress")}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  PAN and address are required for 80G tax exemption receipts as per Income Tax regulations.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message (Optional)
            </label>
            <Textarea
              id="message"
              placeholder="Share your thoughts or blessings..."
              rows={3}
              {...register("message")}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="isPublic"
              onCheckedChange={(checked) =>
                setValue("isPublic", checked === true)
              }
            />
            <label
              htmlFor="isPublic"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Display my name publicly as a supporter
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner className="size-4" />
                Submitting...
              </>
            ) : (
              "I Have Donated"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By submitting, you confirm that you have made the payment. Our team
            will verify and send a receipt to your email.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
