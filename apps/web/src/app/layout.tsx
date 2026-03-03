import type { Metadata } from "next";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "WealthWise - Smart Personal Finance",
    template: "%s | WealthWise",
  },
  description:
    "Take control of your finances with WealthWise. Track transactions, manage budgets, set savings goals, and gain insights with powerful analytics.",
  keywords: [
    "personal finance",
    "budget tracker",
    "expense tracker",
    "savings goals",
    "financial analytics",
  ],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <AuthProvider>
            <QueryProvider>
              {children}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  classNames: {
                    toast: "group toast bg-background text-foreground border-border shadow-lg",
                    title: "text-foreground font-semibold",
                    description: "text-foreground/70",
                    actionButton: "bg-primary text-primary-foreground hover:bg-primary/90",
                    cancelButton: "bg-muted text-muted-foreground hover:bg-muted/90",
                    error: "!bg-destructive !text-destructive-foreground !border-destructive",
                    success: "!bg-success !text-success-foreground !border-success",
                  },
                }}
                richColors
                closeButton
              />
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
