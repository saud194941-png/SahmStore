import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { PageTransition } from "@/components/page-transition";
import { Toaster } from 'sonner';

const font = Tajawal({ subsets: ["arabic"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "متجر سهم - Sahm Store",
  description: "لعبة محاكاة اقتصادية وتعليمية لتجربة إدارة متجر متكامل",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${font.className} antialiased bg-zinc-900 text-foreground flex items-center justify-center min-h-screen p-4 md:p-8 relative`}>
        {/* Background ambient effect */}
        <div className="fixed inset-0 bg-emerald-950/20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/30 via-zinc-950 to-black z-0 pointer-events-none"></div>
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* iPad Mockup Frame (Landscape) */}
          <div className="relative w-full max-w-[1180px] h-[85vh] min-h-[600px] bg-background rounded-[3rem] border-[14px] border-black shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-10 ring-2 ring-zinc-800">
            {/* iPad Camera Hole & Bezels*/}
            <div className="absolute top-1/2 -left-3.5 transform -translate-y-1/2 w-4 h-4 bg-zinc-900 border border-zinc-800 rounded-full z-50 flex items-center justify-center shadow-inner">
               <div className="w-1.5 h-1.5 bg-blue-900 rounded-full shadow-inner shadow-black"></div>
            </div>
            
            <div className="flex w-full h-full overflow-hidden relative z-0">
              <Sidebar />
              <main className="flex-1 max-w-full overflow-y-auto relative bg-background">
                <PageTransition>
                  {children}
                </PageTransition>
              </main>
            </div>
            <Toaster richColors position="top-center" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
