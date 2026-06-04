"use client"

import { useEffect, useState } from "react"
import { useGameStore } from "@/store/gameStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Lightbulb, AlertTriangle, TrendingUp, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AIAdvisorPage() {
  const gameState = useGameStore()
  const [advice, setAdvice] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchAdvice = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          capital: gameState.capital,
          totalProfits: gameState.totalProfits,
          levelName: gameState.levelName,
          customerSatisfaction: gameState.customerSatisfaction,
          products: gameState.products.map(p => ({
            name: p.name,
            stock: p.stock,
            buyPrice: p.buyPrice,
            sellPrice: p.sellPrice
          }))
        })
      })
      const data = await res.json()
      setAdvice(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdvice()
  }, []) // Fetch once on mount

  return (
    <div className="flex flex-col w-full min-h-screen p-6">
      <header className="mb-8 flex flex-col md:flex-row md:items-center gap-4 justify-between bg-card p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="flex items-center gap-4 z-10">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30">
            <BrainCircuit className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-primary mb-1">مستشار سهم الذكي</h1>
            <p className="text-muted-foreground text-sm">مساعدك الشخصي المدعوم بالذكاء الاصطناعي لتحليل متجرك</p>
          </div>
        </div>
        <Button onClick={fetchAdvice} disabled={loading} className="z-10" variant="secondary">
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          تحديث التحليل
        </Button>
      </header>

      {loading && !advice ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <RefreshCw className="w-8 h-8 animate-spin mb-4 text-primary" />
          <p>جاري تحليل بيانات متجرك...</p>
        </div>
      ) : advice ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-emerald-500/30 shadow-sm shadow-emerald-500/10">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <CardTitle className="text-base">تحليل المبيعات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{advice.sales}</p>
            </CardContent>
          </Card>

          <Card className="border-amber-500/30 shadow-sm shadow-amber-500/10">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <CardTitle className="text-base">تنبيهات المخزون</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{advice.inventory}</p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 shadow-sm shadow-blue-500/10">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Lightbulb className="w-5 h-5 text-blue-500" />
              <CardTitle className="text-base">استراتيجية التوسع</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{advice.expansion}</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-20 text-destructive">حدث خطأ أثناء الاتصال بالمستشار. يرجى المحاولة مرة أخرى.</div>
      )}
    </div>
  )
}
