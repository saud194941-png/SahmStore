"use client"

import { useGameStore } from "@/store/gameStore"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Landmark, Banknote, AlertCircle, CheckCircle2 } from "lucide-react"

export default function FinancePage() {
  const { loan, takeLoan, capital } = useGameStore()

  return (
    <div className="flex flex-col w-full min-h-screen p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">المالية والقروض</h1>
        <p className="text-muted-foreground mt-1">اطلب تمويل لتوسيع تجارتك أو استثمر أرباحك</p>
      </header>

      {loan.active && (
        <Card className="mb-8 border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              لديك تمويل نشط
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-sm font-medium">
              <div>
                <p className="text-muted-foreground">المبلغ المتبقي</p>
                <p className="text-xl">{loan.remaining.toLocaleString()} ريال</p>
              </div>
              <div>
                <p className="text-muted-foreground">القسط اليومي</p>
                <p className="text-xl text-destructive">-{loan.dailyPayment} ريال</p>
              </div>
              <div>
                <p className="text-muted-foreground">الفائدة اليومية</p>
                <p className="text-xl text-destructive">-{loan.dailyInterest} ريال</p>
              </div>
            </div>
            <div className="mt-4 w-full bg-destructive/20 h-2 rounded-full overflow-hidden">
              <div className="bg-destructive h-full" style={{ width: `${(loan.remaining / loan.amount) * 100}%` }}></div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className={`border-blue-500/20 ${loan.active ? 'opacity-50 pointer-events-none' : ''}`}>
          <CardHeader>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <Landmark className="w-6 h-6 text-blue-500" />
            </div>
            <CardTitle>تمويل المشاريع الصغيرة</CardTitle>
            <CardDescription>قرض بفوائد منخفضة مدعوم لرواد الأعمال</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">المبلغ المتاح:</span>
              <span className="font-bold">50,000 ريال</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">الفائدة اليومية:</span>
              <span className="font-bold">50 ريال</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">القسط اليومي:</span>
              <span className="font-bold">500 ريال</span>
            </div>
            <Button 
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700" 
              onClick={() => takeLoan(50000, 500, 50)}
              disabled={loan.active}
            >
              {loan.active ? "التمويل قيد السداد" : "طلب التمويل"}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/20">
          <CardHeader>
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
              <Banknote className="w-6 h-6 text-emerald-500" />
            </div>
            <CardTitle>صناديق الاستثمار</CardTitle>
            <CardDescription>استثمر أرباحك الفائضة في أسهم شركات أخرى</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-muted rounded-lg flex justify-between items-center text-sm border border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-background rounded flex items-center justify-center font-bold">SA</div>
                <span>صندوق سهم للنمو</span>
              </div>
              <div className="text-emerald-500 font-bold">+5.2%</div>
            </div>
            <div className="p-3 bg-muted rounded-lg flex justify-between items-center text-sm border border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-background rounded flex items-center justify-center font-bold">TE</div>
                <span>صندوق التقنية</span>
              </div>
              <div className="text-red-500 font-bold">-1.4%</div>
            </div>
            <Button className="w-full mt-4" variant="outline" disabled>فتح محفظة استثمارية (قريباً)</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
