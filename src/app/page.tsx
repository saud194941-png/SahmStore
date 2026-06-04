"use client"

import { useGameStore } from "@/store/gameStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, DollarSign, Users, Sparkles, Calendar, Sun, Activity, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function DashboardPage() {
  const { capital, totalProfits, levelName, customersToday, customerSatisfaction, nextDay, day, season, history } = useGameStore()

  // Format data for Recharts
  const chartData = history.slice(-10).map(h => ({
    name: `اليوم ${h.day}`,
    profit: h.profit,
    capital: h.capital
  }));

  return (
    <div className="flex min-h-screen w-full flex-col p-6">
      <header className="flex h-16 items-center justify-between border-b border-border/40 pb-6 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">لوحة التحكم</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center text-sm font-medium bg-muted px-2 py-1 rounded-md text-muted-foreground"><Calendar className="w-4 h-4 mr-1"/> اليوم {day}</span>
            <span className="flex items-center text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-md"><Sun className="w-4 h-4 mr-1"/> موسم {season}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">المستوى الحالي: {levelName}</Button>
          <Button onClick={nextDay} className="gap-2 shadow-lg shadow-primary/30">
            <Sparkles className="w-4 h-4" />
            إنهاء اليوم الحالي
          </Button>
        </div>
      </header>
      
      <main className="flex flex-1 flex-col gap-6">
        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الرصيد</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{capital.toLocaleString()} ريال</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">العملاء اليوم</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{customersToday}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500 font-medium">{customerSatisfaction}%</span> نسبة الرضا
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الأرباح الإجمالية</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProfits.toLocaleString()} ريال</div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary text-primary-foreground shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary-foreground/80">مستشار سهم الذكي</CardTitle>
              <Activity className="h-4 w-4 text-primary-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium mt-2">
                "مبيعات المنتجات جيدة. أنصحك بالانتقال لصفحة المخزون وتحديد أسعار مناسبة للربح!"
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts & Details section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="col-span-4 bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>نظرة عامة على الأرباح اليومية</CardTitle>
            </CardHeader>
            <CardContent className="pl-2 h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value} ر.س`} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="col-span-3 bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>تطور رأس المال التراكمي</CardTitle>
            </CardHeader>
            <CardContent className="pl-2 h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="capital" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
