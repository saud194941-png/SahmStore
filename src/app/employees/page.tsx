"use client"

import { useGameStore, Employee } from "@/store/gameStore"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Star, TrendingUp } from "lucide-react"

export default function EmployeesPage() {
  const { employees, capital, hireEmployee } = useGameStore()

  const availableCandidates: Omit<Employee, 'id'>[] = [
    { name: 'سارة', role: 'كاشير', salary: 3500, productivity: 85, rating: 4.8 },
    { name: 'محمد', role: 'مسؤول مخزون', salary: 4000, productivity: 90, rating: 4.5 },
    { name: 'خالد', role: 'مدير فرع', salary: 7000, productivity: 95, rating: 5.0 }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">إدارة الموظفين</h1>
          <p className="text-muted-foreground mt-1">قم بتوظيف طاقم عمل لتحسين المبيعات ورضا العملاء</p>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">طاقم العمل الحالي ({employees.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {employees.map(emp => (
              <div key={emp.id} className="flex justify-between items-center p-4 bg-background rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">{emp.name}</h3>
                    <p className="text-xs text-muted-foreground">{emp.role}</p>
                  </div>
                </div>
                <div className="text-left space-y-1">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{emp.rating}</span>
                  </div>
                  <div className="text-xs font-medium">{emp.salary} ر.س/شهر</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">سوق التوظيف</CardTitle>
            <CardDescription>مرشحين متاحين للعمل في متجرك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableCandidates.map((candidate, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-muted/50 rounded-lg border gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{candidate.name}</h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{candidate.role}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3"/> إنتاجية {candidate.productivity}%</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500"/> {candidate.rating}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => hireEmployee(candidate)} 
                  disabled={capital < candidate.salary}
                  variant="default"
                >
                  تعيين ({candidate.salary} ر.س)
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
