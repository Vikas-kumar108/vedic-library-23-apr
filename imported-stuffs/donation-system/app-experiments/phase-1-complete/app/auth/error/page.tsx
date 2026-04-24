"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

const errorMessages: Record<string, string> = {
  default: "An error occurred during authentication.",
  configuration: "There is a problem with the server configuration.",
  accessdenied: "You do not have permission to access this resource.",
  verification: "The verification link has expired or is invalid.",
  signin: "Try signing in with a different account.",
  oauthsignin: "Error in OAuth sign in process.",
  oauthcallback: "Error in OAuth callback.",
  oauthcreateaccount: "Could not create OAuth account.",
  emailcreateaccount: "Could not create email account.",
  callback: "Error in callback handler.",
  oauthaccountnotlinked: "Email already linked to another account.",
  emailsignin: "Check your email for the verification link.",
  credentialssignin: "Invalid email or password.",
  sessionrequired: "Please sign in to continue.",
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error") || "default"
  const message = errorMessages[error.toLowerCase()] || errorMessages.default

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-destructive/5 to-transparent p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="size-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="size-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Authentication Error</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          <p>
            If this problem persists, please contact support at{" "}
            <a
              href="mailto:support@vedicskills.org"
              className="text-primary hover:underline"
            >
              support@vedicskills.org
            </a>
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/auth/login">Try Again</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">Go Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
