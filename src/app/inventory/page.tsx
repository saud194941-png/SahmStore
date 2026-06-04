"use client"

import { useGameStore } from "@/store/gameStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PackageSearch, TrendingUp, AlertTriangle } from "lucide-react"

export default function InventoryPage() {
  const { products, capital, buyProduct, updateSellPrice } = useGameStore()

  return (
    <div className="flex flex-col w-full min-h-screen p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">المخزون والمنتجات</h1>
          <p className="text-muted-foreground mt-1">إدارة البضائع، وتحديد الأسعار، وطلب شحنات جديدة</p>
        </div>
        <div className="bg-card px-4 py-2 rounded-lg border border-border flex items-center gap-3">
          <span className="text-sm font-medium">رأس المال:</span>
          <span className="text-lg font-bold text-emerald-600">{capital.toLocaleString()} ريال</span>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
            <PackageSearch className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length} أصناف</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-destructive">تنبيهات المخزون</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter(p => p.stock < 50).length} منتج منخفض</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col relative overflow-hidden group hover:border-primary/50 transition-colors">
            {product.stock < 50 && (
              <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-[10px] px-2 py-1 font-bold rounded-bl-lg">
                مخزون منخفض
              </div>
            )}
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="text-4xl">{product.imageIcon}</div>
                <div className="text-left text-xs bg-muted px-2 py-1 rounded-md">{product.category}</div>
              </div>
              <CardTitle className="mt-4">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                <span className="text-muted-foreground">الكمية المتوفرة</span>
                <span className="font-bold">{product.stock} حبة</span>
              </div>
              
              <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                <span className="text-muted-foreground">سعر الشراء</span>
                <span className="font-medium">{product.buyPrice} ريال</span>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">سعر البيع</span>
                  <span className="font-bold text-emerald-600">{product.sellPrice} ريال</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => updateSellPrice(product.id, Math.max(1, product.sellPrice - 1))}>- تخفيض</Button>
                  <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => updateSellPrice(product.id, product.sellPrice + 1)}>+ رفع</Button>
                </div>
              </div>

              <div className="mt-auto pt-4 flex gap-2">
                <Button 
                  className="w-full" 
                  onClick={() => buyProduct(product.id, 50)}
                  disabled={capital < (product.buyPrice * 50)}
                >
                  شراء 50 حبة ({(product.buyPrice * 50).toLocaleString()} ر.س)
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
