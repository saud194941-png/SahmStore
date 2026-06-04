import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'

export type Product = {
  id: string;
  name: string;
  category: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  demandRate: number;
  imageIcon: string;
}

export type Employee = {
  id: string;
  name: string;
  role: 'كاشير' | 'مدير فرع' | 'مسؤول مخزون' | 'موظف تسويق';
  salary: number;
  productivity: number; // 1-100
  rating: number; // 1-5
}

export type Loan = {
  active: boolean;
  amount: number;
  remaining: number;
  dailyInterest: number; // e.g. 50
  dailyPayment: number; // e.g. 200
}

export type Region = {
  id: number;
  name: string;
  type: string;
  cost: number;
  demand: string;
  owned: boolean;
  multiplier: number;
}

interface GameState {
  day: number;
  season: 'عادي' | 'رمضان' | 'العيد' | 'العودة للمدارس';
  capital: number;
  totalProfits: number;
  totalLosses: number;
  level: number;
  levelName: string;
  customersToday: number;
  customerSatisfaction: number;
  products: Product[];
  employees: Employee[];
  loan: Loan;
  regions: Region[];
  history: { day: number, profit: number, capital: number }[];
  
  // Actions
  buyProduct: (productId: string, quantity: number) => void;
  updateSellPrice: (productId: string, newPrice: number) => void;
  hireEmployee: (employee: Omit<Employee, 'id'>) => void;
  takeLoan: (amount: number, dailyPayment: number, dailyInterest: number) => void;
  buyRegion: (regionId: number) => void;
  nextDay: () => void;
}

const initialProducts: Product[] = [
  { id: '1', name: 'مياه معدنية', category: 'مشروبات', buyPrice: 1, sellPrice: 2, stock: 150, demandRate: 0.9, imageIcon: '💧' },
  { id: '2', name: 'خبز طازج', category: 'أغذية', buyPrice: 2, sellPrice: 3, stock: 50, demandRate: 0.95, imageIcon: '🍞' },
  { id: '3', name: 'شوكولاتة', category: 'أغذية', buyPrice: 3, sellPrice: 5, stock: 30, demandRate: 0.7, imageIcon: '🍫' },
  { id: '4', name: 'عصير برتقال', category: 'مشروبات', buyPrice: 4, sellPrice: 7, stock: 40, demandRate: 0.6, imageIcon: '🧃' },
];

const initialRegions: Region[] = [
  { id: 1, name: 'الرياض - العليا', type: 'منطقة تجارية فاخرة', cost: 150000, demand: 'مرتفع جداً', owned: false, multiplier: 3.0 },
  { id: 2, name: 'جدة - البلد', type: 'منطقة تاريخية وموسمية', cost: 80000, demand: 'مرتفع', owned: false, multiplier: 2.0 },
  { id: 3, name: 'الدمام - الكورنيش', type: 'منطقة سياحية', cost: 100000, demand: 'متوسط', owned: false, multiplier: 2.5 },
  { id: 4, name: 'حيك الحالي', type: 'منطقة سكنية', cost: 0, demand: 'متوسط', owned: true, multiplier: 1.0 },
];

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
  day: 1,
  season: 'عادي',
  capital: 10000,
  totalProfits: 450,
  totalLosses: 0,
  level: 1,
  levelName: 'بقالة صغيرة',
  customersToday: 24,
  customerSatisfaction: 85,
  products: initialProducts,
  employees: [
    { id: '1', name: 'أحمد', role: 'كاشير', salary: 3000, productivity: 80, rating: 4.5 }
  ],
  loan: { active: false, amount: 0, remaining: 0, dailyInterest: 0, dailyPayment: 0 },
  regions: initialRegions,
  history: [{ day: 1, profit: 450, capital: 10000 }],

  buyProduct: (productId, quantity) => set((state) => {
    const product = state.products.find(p => p.id === productId);
    if (!product) return state;
    
    const cost = product.buyPrice * quantity;
    if (state.capital < cost) {
      toast.error('رصيدك لا يكفي!');
      return state; 
    }

    toast.success(`تم شراء ${quantity} حبة من ${product.name}`);
    return {
      capital: state.capital - cost,
      totalLosses: state.totalLosses + cost,
      products: state.products.map(p => 
        p.id === productId ? { ...p, stock: p.stock + quantity } : p
      )
    };
  }),

  updateSellPrice: (productId, newPrice) => set((state) => ({
    products: state.products.map(p => 
      p.id === productId ? { ...p, sellPrice: newPrice } : p
    )
  })),

  hireEmployee: (employee) => set((state) => {
    toast.success(`تم تعيين ${employee.name} بنجاح!`);
    return {
      employees: [...state.employees, { ...employee, id: Math.random().toString() }]
    }
  }),

  takeLoan: (amount, dailyPayment, dailyInterest) => set((state) => {
    if (state.loan.active) {
      toast.error('لديك قرض نشط بالفعل!');
      return state;
    }
    toast.success(`تم إيداع ${amount} ريال في حسابك كقرض.`);
    return {
      capital: state.capital + amount,
      loan: { active: true, amount, remaining: amount, dailyInterest, dailyPayment }
    }
  }),

  buyRegion: (regionId) => set((state) => {
    const region = state.regions.find(r => r.id === regionId);
    if (!region || region.owned || state.capital < region.cost) {
      toast.error('رصيدك لا يكفي لشراء هذا الفرع!');
      return state;
    }
    toast.success(`مبروك! تم افتتاح فرع ${region.name} 🎊`);
    return {
      capital: state.capital - region.cost,
      regions: state.regions.map(r => r.id === regionId ? { ...r, owned: true } : r)
    }
  }
),

  nextDay: () => set((state) => {
    let dailyProfit = 0;
    
    // Calculate global multiplier from branches & employees
    let branchesMultiplier = state.regions.filter(r => r.owned).reduce((acc, r) => acc + r.multiplier, 0);
    let marketingBonus = state.employees.filter(e => e.role === 'موظف تسويق').length * 0.5;
    let globalDemand = branchesMultiplier + marketingBonus;

    // Seasonal effects
    let currentSeason = state.season;
    if (state.day === 10) { currentSeason = 'رمضان'; toast.info('🌙 بدأ موسم رمضان! إقبال شديد على الأغذية والمشروبات.'); }
    else if (state.day === 40) { currentSeason = 'العيد'; toast.success('🎉 جاء العيد! حركة شرائية قوية.'); }
    else if (state.day === 45) { currentSeason = 'عادي'; }

    let seasonMultiplier = 1;
    if (currentSeason === 'رمضان') seasonMultiplier = 1.5;
    if (currentSeason === 'العيد') seasonMultiplier = 2.0;

    const updatedProducts = state.products.map(p => {
      // Base demand adjusted by global multipliers and price difference
      let itemDemand = p.demandRate * globalDemand * seasonMultiplier;
      
      // Price penalty/bonus (cheaper sells faster)
      const priceRatio = p.buyPrice / Math.max(1, p.sellPrice); 
      itemDemand = itemDemand * (priceRatio * 2);

      const soldQuantity = Math.min(p.stock, Math.floor(Math.random() * 20 * itemDemand));
      dailyProfit += soldQuantity * p.sellPrice;
      
      return { ...p, stock: p.stock - soldQuantity };
    });

    // Pay salaries
    const dailySalaries = state.employees.reduce((acc, emp) => acc + (emp.salary / 30), 0);
    
    // Loan deductions
    let loanDeduction = 0;
    let newLoan = { ...state.loan };
    if (state.loan.active) {
      loanDeduction = state.loan.dailyPayment + state.loan.dailyInterest;
      newLoan.remaining -= state.loan.dailyPayment;
      if (newLoan.remaining <= 0) {
        newLoan.active = false;
        toast.success('لقد قمت بسداد القرض بالكامل! 🎉');
      }
    }

    const netProfit = dailyProfit - dailySalaries - loanDeduction;

    // Random Events
    if (Math.random() > 0.8) { // 20% chance
      const events = [
        "إقبال شديد غير متوقع اليوم! 🛍️",
        "تفتيش مفاجئ من البلدية.. المتجر سليم ولله الحمد 👮",
        "عميل مخلص أثنى على متجرك في تويتر! 📱"
      ];
      const ev = events[Math.floor(Math.random() * events.length)];
      setTimeout(() => toast.info(`حدث اليوم: ${ev}`), 1000);
    }

    // Achievements Logic check
    const newTotalProfits = state.totalProfits + dailyProfit;
    const newCapital = state.capital + netProfit;

let newLevel = state.level;
let newLevelName = state.levelName;

if (newTotalProfits >= 1000 && state.level === 1) {
  toast.success('إنجاز جديد: التاجر الصغير! تم فتح مستوى 2 🏅');
  newLevel = 2;
  newLevelName = 'متجر حي';
}
    return {
      day: state.day + 1,
      season: currentSeason,
      capital: newCapital,
      totalProfits: newTotalProfits,
      totalLosses: state.totalLosses + dailySalaries + loanDeduction,
      customersToday: Math.floor(Math.random() * 50 * globalDemand) + 10,
      products: updatedProducts,
      loan: newLoan,
      level: newLevel,
      levelName: newLevelName,
      history: [
        ...state.history,
        {
          day: state.day + 1,
          profit: dailyProfit,
          capital: newCapital
        }
      ]
    };
  })
}),
{
  name: 'sahm-store-storage',
}
));
