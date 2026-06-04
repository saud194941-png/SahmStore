"use client"

import { useGameStore } from "@/store/gameStore"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Map as MapIcon, MapPin, Navigation, Store } from "lucide-react"

export default function MapPage() {
  const { regions, buyRegion, capital } = useGameStore()

  return (
    <div className="flex flex-col w-full min-h-screen p-6">
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">الخريطة والعقارات</h1>
          <p className="text-muted-foreground mt-1">قم بشراء فروع جديدة وتوسع في مدن المملكة لزيادة الطلب</p>
        </div>
        <div className="bg-card px-4 py-2 rounded-lg border text-sm font-bold">
          الرصيد: <span className="text-emerald-500">{capital.toLocaleString()} ريال</span>
        </div>
      </header>

      <div className="w-full h-48 bg-muted rounded-xl mb-8 flex items-center justify-center border-2 border-dashed border-border relative overflow-hidden">
        <MapIcon className="w-24 h-24 text-muted-foreground/20 absolute" />
        <div className="z-10 text-center">
          <Navigation className="w-8 h-8 mx-auto text-primary mb-2" />
          <h2 className="font-bold text-lg">خريطة المملكة التفاعلية</h2>
          <p className="text-sm text-muted-foreground">يمكنك تصفح مناطق جديدة للاستحواذ عليها</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {regions.map((region) => (
          <Card key={region.id} className={region.owned ? 'border-primary shadow-md bg-primary/5' : ''}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <MapPin className={`w-5 h-5 ${region.owned ? 'text-primary' : 'text-muted-foreground'}`} />
                  <CardTitle>{region.name}</CardTitle>
                </div>
                {region.owned && <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-bold">مملوك</span>}
              </div>
              <CardDescription>{region.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 mb-4 text-sm">
                <div className="flex justify-between items-center border-b pb-1">
                  <span className="text-muted-foreground">القوة الشرائية والطلب:</span>
                  <span className="font-bold">{region.demand}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-1">
                  <span className="text-muted-foreground">مضاعف العملاء:</span>
                  <span className="font-bold text-emerald-500">x{region.multiplier}</span>
                </div>
              </div>
              
              {!region.owned ? (
                <Button 
                  className="w-full" 
                  variant="outline" 
                  onClick={() => buyRegion(region.id)}
                  disabled={capital < region.cost}
                >
                  شراء فرع ({region.cost.toLocaleString()} ريال)
                </Button>
              ) : (
                <Button className="w-full" variant="secondary">إدارة الفرع <Store className="ml-2 w-4 h-4" /></Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
