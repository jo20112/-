import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PodiumCardProps {
  rank: 1 | 2 | 3;
  name: string;
  points: number;
  initials: string;
}

export default function PodiumCard({ rank, name, points, initials }: PodiumCardProps) {
  const crownColors = {
    1: "text-gold",
    2: "text-silver",
    3: "text-bronze",
  };

  const bgColors = {
    1: "bg-gold/10 border-gold/20",
    2: "bg-silver/10 border-silver/20",
    3: "bg-bronze/10 border-bronze/20",
  };

  const textColors = {
    1: "text-gold",
    2: "text-silver-foreground",
    3: "text-bronze",
  };

  const labels = {
    1: "المركز الأول",
    2: "المركز الثاني",
    3: "المركز الثالث",
  };

  return (
    <Card
      className={cn(
        "p-6 text-center relative overflow-visible border-2",
        bgColors[rank],
        rank === 1 && "scale-105"
      )}
      data-testid={`card-podium-${rank}`}
    >
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <div className={cn("p-3 rounded-full bg-card border-2 shadow-lg", bgColors[rank])}>
          <Crown className={cn("h-8 w-8", crownColors[rank])} fill="currentColor" />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <Avatar className="h-20 w-20 mx-auto border-4 border-background shadow-lg">
          <AvatarFallback className={cn("text-2xl font-bold", bgColors[rank], textColors[rank])}>
            {initials}
          </AvatarFallback>
        </Avatar>

        <div>
          <h3 className="text-lg font-bold mb-1" data-testid={`text-podium-name-${rank}`}>
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">{labels[rank]}</p>
        </div>

        <div className={cn("text-4xl font-bold", textColors[rank])} data-testid={`text-podium-points-${rank}`}>
          {points}
          <span className="text-sm text-muted-foreground mr-2">نقطة</span>
        </div>
      </div>
    </Card>
  );
}
