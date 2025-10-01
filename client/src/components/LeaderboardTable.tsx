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
import QuickActionButtons from "./QuickActionButtons";
import { Trophy } from "lucide-react";

export interface Admin {
  id: string;
  name: string;
  initials: string;
  avatar_url?: string;
  totalPoints: number;
  attendance: number;
  delays: number;
  absences: number;
}

interface LeaderboardTableProps {
  admins: Admin[];
  onAction: (adminId: string, action: string, points: number) => void;
}

export default function LeaderboardTable({ admins, onAction }: LeaderboardTableProps) {
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
            <TableHead className="text-right">الإجراءات</TableHead>
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
              <TableCell>
                <QuickActionButtons
                  onAction={(action, points) => onAction(admin.id, action, points)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
