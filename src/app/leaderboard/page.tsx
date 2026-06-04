"use client"

import { useGameStore } from "@/store/gameStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Crown, Star } from "lucide-react"

export default function LeaderboardPage() {
  const { capital, levelName, level } = useGameStore()

  // Generate fake leaderboard data, inserting the current player
  const leaderboard = [
    { rank: 1, name: "متاجر الفخامة", score: 850000, level: "سلسلة كبرى" },
    { rank: 2, name: "أسواق التوفير", score: 420000, level: "سوبر ماركت" },
    { rank: 3, name: "بقالة أبو خالد", score: 150000, level: "متجر حي" },
    { rank: 4, name: "أنت (متجرك)", score: capital, level: levelName, isCurrent: true },
    { rank: 5, name: "سوبر ماركت الهدى", score: 8000, level: "بقالة صغيرة" },
    { rank: 6, name: "تموينات البركة", score: 3500, level: "بقالة صغيرة" },
  ].sort((a, b) => b.score - a.score).map((item, index) => ({ ...item, rank: index + 1 }));

  return (
    <div className="flex flex-col w-full min-h-screen p-6">
      <header className="mb-8 text-center pt-8">
        <div className="w-20 h-20 bg-amber-500/20 rounded-full mx-auto flex items-center justify-center mb-4">
          <Crown className="w-10 h-10 text-amber-500" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">التصنيف العالمي للمتاجر</h1>
        <p className="text-muted-foreground mt-2">تنافس مع أفضل التجار لرفع ترتيب متجرك بين العمالقة</p>
      </header>

      <div className="max-w-3xl mx-auto w-full space-y-4">
        {leaderboard.map((player) => (
          <Card key={player.name} className={`overflow-hidden border-2 ${player.isCurrent ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-border/40'}`}>
            <CardContent className="p-0">
              <div className="flex items-center p-4 gap-4">
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-xl font-bold shadow-inner ${
                  player.rank === 1 ? 'bg-amber-500 text-white' : 
                  player.rank === 2 ? 'bg-slate-300 text-slate-800' : 
                  player.rank === 3 ? 'bg-amber-700 text-white' : 
                  'bg-muted text-muted-foreground'
                }`}>
                  #{player.rank}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold text-lg ${player.isCurrent ? 'text-emerald-500' : ''}`}>
                      {player.name}
                    </h3>
                    {player.isCurrent && <span className="px-2 py-0.5 text-[10px] bg-emerald-500 text-white rounded-full">أنت</span>}
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Star className="w-3 h-3" /> {player.level}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold font-mono">{player.score.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">ريال كقيمة سوقية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
