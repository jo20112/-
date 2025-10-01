import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Calendar, Award, LogIn } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import StatsCard from "@/components/StatsCard";
import PodiumCard from "@/components/PodiumCard";
import RewardsSection from "@/components/RewardsSection";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

interface Admin {
  id: string;
  name: string;
  initials: string;
  avatar_url?: string;
  totalPoints: number;
  attendance: number;
  delays: number;
  absences: number;
}

export default function Leaderboard() {
  const [, setLocation] = useLocation();
  
  //todo: remove mock functionality - replace with real Supabase data
  const [admins] = useState<Admin[]>([
    { id: "1", name: "سارة علي", initials: "سع", totalPoints: 180, attendance: 25, delays: 2, absences: 0 },
    { id: "2", name: "أحمد محمد", initials: "أم", totalPoints: 145, attendance: 22, delays: 4, absences: 1 },
    { id: "3", name: "محمود حسن", initials: "مح", totalPoints: 132, attendance: 20, delays: 5, absences: 2 },
    { id: "4", name: "فاطمة أحمد", initials: "فأ", totalPoints: 115, attendance: 18, delays: 6, absences: 3 },
    { id: "5", name: "خالد يوسف", initials: "خي", totalPoints: 98, attendance: 16, delays: 7, absences: 4 },
    { id: "6", name: "نور الدين", initials: "ند", totalPoints: 85, attendance: 14, delays: 8, absences: 5 },
  ]);

  const topThree = admins.slice(0, 3);
  const totalAdmins = admins.length;
  const totalPoints = admins.reduce((sum, admin) => sum + admin.totalPoints, 0);

  const getRankBadge = (index: number) => {
    if (index === 0)
      return (
        <Badge className="bg-gold/20 text-gold border-gold/30" data-testid="badge-rank-1">
          <Trophy className="h-3 w-3 ml-1" />1
        </Badge>
      );
    if (index === 1)
      return (
        <Badge className="bg-silver/20 text-silver-foreground border-silver/30" data-testid="badge-rank-2">
          <Trophy className="h-3 w-3 ml-1" />2
        </Badge>
      );
    if (index === 2)
      return (
        <Badge className="bg-bronze/20 text-bronze border-bronze/30" data-testid="badge-rank-3">
          <Trophy className="h-3 w-3 ml-1" />3
        </Badge>
      );
    return (
      <span className="text-sm text-muted-foreground" data-testid={`text-rank-${index + 1}`}>
        {index + 1}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold" data-testid="text-page-title">
                  لوحة المسابقة
                </h1>
                <p className="text-sm text-muted-foreground">
                  نظام تتبع أداء المشرفين
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setLocation("/login")}
                className="gap-2"
                data-testid="button-admin-login"
              >
                <LogIn className="h-4 w-4" />
                تسجيل الدخول
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
          <h2 className="text-2xl font-bold mb-6" data-testid="text-section-leaderboard">
            جدول الترتيب الكامل
          </h2>

          <div className="border rounded-lg overflow-hidden" data-testid="table-leaderboard">
            <Table>
              <TableHeader className="bg-muted/50 sticky top-0 z-10">
                <TableRow>
                  <TableHead className="text-right w-16">الترتيب</TableHead>
                  <TableHead className="text-right">المشرف</TableHead>
                  <TableHead className="text-right">إجمالي النقاط</TableHead>
                  <TableHead className="text-right w-24">الحضور</TableHead>
                  <TableHead className="text-right w-24">التأخيرات</TableHead>
                  <TableHead className="text-right w-24">الغيابات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin, index) => (
                  <TableRow
                    key={admin.id}
                    className="hover-elevate"
                    data-testid={`row-admin-${admin.id}`}
                  >
                    <TableCell className="font-medium">{getRankBadge(index)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          {admin.avatar_url && <AvatarImage src={admin.avatar_url} alt={admin.name} />}
                          <AvatarFallback className="text-sm font-semibold">
                            {admin.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium" data-testid={`text-admin-name-${admin.id}`}>
                          {admin.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-2xl font-bold text-primary" data-testid={`text-points-${admin.id}`}>
                        {admin.totalPoints}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                        {admin.attendance}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                        {admin.delays}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                        {admin.absences}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
    </div>
  );
}
