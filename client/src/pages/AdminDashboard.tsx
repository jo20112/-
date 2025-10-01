import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Calendar, Award, UserPlus, LogOut } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import StatsCard from "@/components/StatsCard";
import PodiumCard from "@/components/PodiumCard";
import LeaderboardTable, { Admin } from "@/components/LeaderboardTable";
import AddAdminDialog from "@/components/AddAdminDialog";
import RewardsSection from "@/components/RewardsSection";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  //todo: remove mock functionality - replace with real Supabase data
  const [admins, setAdmins] = useState<Admin[]>([
    { id: "1", name: "سارة علي", initials: "سع", totalPoints: 180, attendance: 25, delays: 2, absences: 0 },
    { id: "2", name: "أحمد محمد", initials: "أم", totalPoints: 145, attendance: 22, delays: 4, absences: 1 },
    { id: "3", name: "محمود حسن", initials: "مح", totalPoints: 132, attendance: 20, delays: 5, absences: 2 },
    { id: "4", name: "فاطمة أحمد", initials: "فأ", totalPoints: 115, attendance: 18, delays: 6, absences: 3 },
    { id: "5", name: "خالد يوسف", initials: "خي", totalPoints: 98, attendance: 16, delays: 7, absences: 4 },
    { id: "6", name: "نور الدين", initials: "ند", totalPoints: 85, attendance: 14, delays: 8, absences: 5 },
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      setLocation("/login");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل خروجك بنجاح",
    });
    setLocation("/");
  };

  const handleAction = (adminId: string, action: string, points: number) => {
    //todo: remove mock functionality - replace with Supabase update
    setAdmins((prev) =>
      prev.map((admin) => {
        if (admin.id === adminId) {
          const newPoints = admin.totalPoints + points;
          
          let updatedAdmin = { ...admin, totalPoints: newPoints };
          
          if (action.includes("حضور") || action.includes("التزام")) {
            updatedAdmin.attendance += 1;
          } else if (action.includes("تأخير")) {
            updatedAdmin.delays += 1;
          } else if (action.includes("غياب")) {
            updatedAdmin.absences += 1;
          }
          
          return updatedAdmin;
        }
        return admin;
      }).sort((a, b) => b.totalPoints - a.totalPoints)
    );

    toast({
      title: points > 0 ? "تم إضافة النقاط" : "تم خصم النقاط",
      description: `${action}: ${points > 0 ? '+' : ''}${points} نقطة`,
      variant: points > 0 ? "default" : "destructive",
    });
  };

  const handleAddAdmin = (name: string, avatarUrl?: string) => {
    //todo: remove mock functionality - replace with Supabase insert
    const initials = name.split(" ").map(n => n[0]).join("");
    const newAdmin: Admin = {
      id: Date.now().toString(),
      name,
      initials,
      avatar_url: avatarUrl,
      totalPoints: 0,
      attendance: 0,
      delays: 0,
      absences: 0,
    };
    
    setAdmins((prev) => [...prev, newAdmin].sort((a, b) => b.totalPoints - a.totalPoints));
    
    toast({
      title: "تم إضافة المشرف",
      description: `تمت إضافة ${name} بنجاح`,
    });
  };

  const topThree = admins.slice(0, 3);
  const totalAdmins = admins.length;
  const totalPoints = admins.reduce((sum, admin) => sum + admin.totalPoints, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold" data-testid="text-page-title">
                  لوحة التحكم الإدارية
                </h1>
                <p className="text-sm text-muted-foreground">
                  إدارة نظام المسابقة
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="gap-2"
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4" />
                تسجيل الخروج
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="إجمالي المشرفين"
            value={totalAdmins}
            icon={Users}
            trend="نشط"
          />
          <StatsCard
            title="إجمالي النقاط"
            value={totalPoints}
            icon={TrendingUp}
            trend="موزعة"
          />
          <StatsCard
            title="الفترة النشطة"
            value="10 أيام"
            icon={Calendar}
            trend="متبقية"
          />
          <StatsCard
            title="الجائزة القادمة"
            value="30K"
            icon={Award}
            trend="نقطة"
          />
        </div>

        <div className="bg-gradient-to-b from-primary/5 to-transparent rounded-xl p-8 border">
          <h2 className="text-2xl font-bold mb-8 text-center" data-testid="text-section-podium">
            🏆 المراكز الثلاثة الأولى
          </h2>
          
          {topThree.length >= 3 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto">
              <div className="md:order-1">
                <PodiumCard
                  rank={2}
                  name={topThree[1].name}
                  points={topThree[1].totalPoints}
                  initials={topThree[1].initials}
                />
              </div>
              <div className="md:order-2">
                <PodiumCard
                  rank={1}
                  name={topThree[0].name}
                  points={topThree[0].totalPoints}
                  initials={topThree[0].initials}
                />
              </div>
              <div className="md:order-3">
                <PodiumCard
                  rank={3}
                  name={topThree[2].name}
                  points={topThree[2].totalPoints}
                  initials={topThree[2].initials}
                />
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              لا يوجد عدد كافٍ من المشرفين لعرض المنصة
            </div>
          )}
        </div>

        <RewardsSection />

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" data-testid="text-section-leaderboard">
              جدول الترتيب الكامل
            </h2>
            <Button
              onClick={() => setShowAddDialog(true)}
              className="gap-2"
              data-testid="button-add-admin"
            >
              <UserPlus className="h-4 w-4" />
              إضافة مشرف
            </Button>
          </div>

          <LeaderboardTable admins={admins} onAction={handleAction} />
        </div>

        <div className="bg-muted/50 rounded-lg p-6 border">
          <h3 className="text-lg font-semibold mb-4">ملاحظات هامة</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• يتم حساب النقاط تلقائياً بناءً على الحضور والالتزام والنشاط</li>
            <li>• المراكز الثلاثة الأولى يتم تحديثها فوراً عند تغيير النقاط</li>
            <li>• الجوائز توزع كل 10 أيام حسب الترتيب النهائي</li>
            <li>• الفائز لا يمكنه الترشح مرة أخرى إلا بعد مرور 20 يوم</li>
          </ul>
        </div>
      </main>

      <AddAdminDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddAdmin}
      />
    </div>
  );
}
