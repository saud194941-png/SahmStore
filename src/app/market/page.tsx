"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Target, TrendingDown, Swords, Percent } from "lucide-react"

export default function MarketPage() {
  const competitors = [
    { name: 'متجر التوفير', type: 'اقتصادي', threat: 'متوسط', priceStrategy: 'منخفضة', icon: Percent, color: 'text-blue-500' },
    { name: 'الدانوب الفاخر', type: 'فاخر', threat: 'عالي', priceStrategy: 'مرتفعة جداً', icon: Star, color: 'text-amber-500' },
    { name: 'نون السريع', type: 'إلكتروني', threat: 'عالي جداً', priceStrategy: 'ديناميكية', icon: Target, color: 'text-purple-500' },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">المنافسة والسوق</h1>
        <p className="text-muted-foreground mt-1">راقب المنافسين واضبط استراتيجيتك</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="bg-destructive/5 border-destructive/20">
          <CardHeader>
            <CardTitle className="text-sm text-destructive flex items-center gap-2">
              <TrendingDown className="w-4 h-4" />
              حالة السوق اليوم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">حرب أسعار</p>
            <p className="text-sm text-muted-foreground mt-2">متجر التوفير قام بتخفيض أسعار الأغذية الأساسية بنسبة 15%. يُنصح بمراجعة أسعارك.</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Swords className="w-5 h-5" /> أبرز المنافسين في منطقتك</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {competitors.map((comp, idx) => (
          <Card key={idx} className="overflow-hidden">
            <div className={`h-2 w-full bg-muted`}>
              <div className={`h-full ${comp.color.replace('text-', 'bg-')}`} style={{ width: comp.threat === 'عالي جداً' ? '90%' : comp.threat === 'عالي' ? '70%' : '40%' }}></div>
            </div>
            <CardHeader>
              <div className="flex items-center gap-3">
                <comp.icon className={`w-8 h-8 ${comp.color}`} />
                <div>
                  <CardTitle>{comp.name}</CardTitle>
                  <CardDescription>{comp.type}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-1">
                <span className="text-muted-foreground">مستوى التهديد</span>
                <span className="font-bold">{comp.threat}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-muted-foreground">استراتيجية التسعير</span>
                <span className="font-bold">{comp.priceStrategy}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Star(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
