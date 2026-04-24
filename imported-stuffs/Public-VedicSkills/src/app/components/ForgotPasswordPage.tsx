interface ForgotPasswordPageProps {
  onNavigate: (page: string) => void;
}

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <button onClick={() => onNavigate("home")} className="flex items-center justify-center gap-2 mb-12 mx-auto">
          <div className="w-10 h-10 rounded-full bg-primary"></div>
          <span className="font-semibold text-2xl text-foreground">VedicSkills</span>
        </button>

        {/* Card */}
        <div className="bg-card rounded-[24px] p-8 lg:p-10 border border-border shadow-lg">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl mb-2">Forgot your password?</h1>
            <p className="text-foreground/70">Enter your email to receive a reset link</p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-foreground/80">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-5 py-3.5 bg-input-background border border-border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 rounded-[16px] hover:opacity-90 transition-opacity shadow-md"
            >
              Send Reset Link
            </button>
          </form>

          {/* Back to Login */}
          <p className="text-center text-sm text-foreground/60 mt-8">
            Remember your password?{" "}
            <button
              onClick={() => onNavigate("login")}
              className="text-primary hover:underline"
            >
              Back to login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
