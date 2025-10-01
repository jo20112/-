import { Card } from "@/components/ui/card";
import { Trophy, Crown, Medal, Award } from "lucide-react";

export default function RewardsSection() {
  return (
    <Card className="p-8 bg-gradient-to-br from-primary/5 via-transparent to-primary/5">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Award className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold">جوائز المسابقة</h3>
          <Award className="h-6 w-6 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          يتم توزيع الجوائز كل 10 أيام حسب الترتيب النهائي
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card className="p-6 text-center border-2 border-gold/30 bg-gold/5 hover-elevate" data-testid="card-reward-first">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-gold/20">
              <Crown className="h-10 w-10 text-gold" fill="currentColor" />
            </div>
          </div>
          <h4 className="text-xl font-bold mb-2 text-gold">🥇 المركز الأول</h4>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-foreground">30,000 نقطة</p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-primary">+</span>
              <span className="font-semibold">VIP 4</span>
            </div>
            <p className="text-xs text-muted-foreground">لمدة 5 أيام</p>
          </div>
        </Card>

        <Card className="p-6 text-center border-2 border-silver/30 bg-silver/5 hover-elevate" data-testid="card-reward-second">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-silver/20">
              <Trophy className="h-10 w-10 text-silver-foreground" />
            </div>
          </div>
          <h4 className="text-xl font-bold mb-2">🥈 المركز الثاني</h4>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-foreground">20,000 نقطة</p>
          </div>
        </Card>

        <Card className="p-6 text-center border-2 border-bronze/30 bg-bronze/5 hover-elevate" data-testid="card-reward-third">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-bronze/20">
              <Medal className="h-10 w-10 text-bronze" />
            </div>
          </div>
          <h4 className="text-xl font-bold mb-2 text-bronze">🥉 المركز الثالث</h4>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-foreground">15,000 نقطة</p>
          </div>
        </Card>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          ⚠️ الفائز لا يمكنه الترشح مرة أخرى إلا بعد مرور 20 يوم
        </p>
      </div>
    </Card>
  );
}
