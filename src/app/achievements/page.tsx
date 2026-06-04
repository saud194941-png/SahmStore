"use client"

import { useGameStore } from "@/store/gameStore"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Trophy, Star, Medal, CheckCircle2, Lock } from "lucide-react"

export default function AchievementsPage() {
  const { level, levelName, totalProfits, employees, regions } = useGameStore()

  const achievements = [
    { id: 1, title: 'البداية', description: 'أول عملية بيع ناجحة', unlocked: totalProfits > 0, xp: 50, icon: Star },
    { id: 2, title: 'التاجر الصغير', description: 'تحقيق أول 1000 ريال ربح', unlocked: totalProfits >= 1000, xp: 100, icon: Medal },
    { id: 3, title: 'فريق العمل', description: 'تعيين أول موظف', unlocked: employees.length > 1, xp: 150, icon: Trophy },
    { id: 4, title: 'إمبراطورية مصغرة', description: 'افتتاح أول فرع جديد', unlocked: regions.filter(r => r.owned).length > 1, xp: 300, icon: Lock },
    { id: 5, title: 'ثروة طائلة', description: 'الوصول إلى 50,000 ريال أرباح', unlocked: totalProfits >= 50000, xp: 500, icon: Lock },
  ];

  const currentXp = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0);
  const nextLevelXp = level === 1 ? 1000 : level === 2 ? 5000 : 10000;
  const progressPercent = Math.min(100, (currentXp / nextLevelXp) * 100);

  return (
    <div className="flex flex-col w-full min-h-screen p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">الإنجازات والمستويات</h1>
        <p className="text-muted-foreground mt-1">اكسب نقاط الخبرة (XP) لفتح مستويات وميزات جديدة</p>
      </header>

      <div className="mb-8 p-6 bg-primary text-primary-foreground rounded-xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">المستوى الحالي: {level} ({levelName})</h2>
          <div className="w-full bg-primary-foreground/20 rounded-full h-3 mb-2">
            <div className="bg-white h-3 rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <p className="text-sm">{currentXp} / {nextLevelXp} XP للوصول للمستوى التالي</p>
        </div>
        <Trophy className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((item) => (
          <Card key={item.id} className={`border-2 ${item.unlocked ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-border opacity-70'}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${item.unlocked ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground'}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                {item.unlocked && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              </div>
              <CardTitle className="mt-4">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold text-primary">+{item.xp} XP</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
