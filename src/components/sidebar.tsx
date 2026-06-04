"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Users, BrainCircuit, Trophy, Target, Menu, Map, Landmark, Medal } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useState } from "react"

const navigation = [
  { name: 'لوحة التحكم', href: '/', icon: LayoutDashboard },
  { name: 'المخزون والمنتجات', href: '/inventory', icon: Package },
  { name: 'إدارة الموظفين', href: '/employees', icon: Users },
  { name: 'المالية والقروض', href: '/finance', icon: Landmark },
  { name: 'الخريطة والعقارات', href: '/map', icon: Map },
  { name: 'المنافسة والسوق', href: '/market', icon: Target },
  { name: 'مستشار سهم (AI)', href: '/ai', icon: BrainCircuit },
  { name: 'الإنجازات', href: '/achievements', icon: Trophy },
  { name: 'التصنيف العالمي', href: '/leaderboard', icon: Medal },
]

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const NavLinks = () => (
    <div className="space-y-1 py-4">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link key={item.name} href={item.href} onClick={() => setOpen(false)}>
            <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              isActive 
                ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}>
              <item.icon className="w-5 h-5" />
              {item.name}
            </div>
          </Link>
        )
      })}
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="md:hidden flex items-center p-4 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          {/* @ts-expect-error - asChild type issue with Radix UI */}
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] p-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-primary">متجر سهم</h1>
            </div>
            <NavLinks />
          </SheetContent>
        </Sheet>
        <div className="font-bold text-lg text-primary mr-2">متجر سهم</div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 border-l border-border/40 bg-card/30 backdrop-blur-xl h-screen sticky top-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary shadow-lg shadow-primary/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-primary leading-tight">متجر سهم</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">محاكاة الأعمال</span>
            </div>
          </div>
          <NavLinks />
        </div>
        <div className="mt-auto p-6">
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center">
            <div className="text-xs font-medium text-primary mb-2">المستوى الحالي</div>
            <div className="text-lg font-bold">بقالة صغيرة</div>
            <div className="w-full bg-background rounded-full h-2 mt-3">
              <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="text-[10px] text-muted-foreground mt-2">450 / 1000 XP</div>
          </div>
        </div>
      </div>
    </>
  )
}
