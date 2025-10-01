import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Clock,
  XCircle,
  MessageSquare,
  FileText,
  Megaphone,
  Calendar,
  Plus,
  Minus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface QuickActionButtonsProps {
  onAction: (action: string, points: number) => void;
}

export default function QuickActionButtons({ onAction }: QuickActionButtonsProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap" data-testid="container-quick-actions">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="hover-elevate active-elevate-2"
            data-testid="button-attendance"
          >
            <CheckCircle2 className="h-4 w-4 ml-2" />
            الحضور
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => onAction("حضور كامل", 10)}
            data-testid="action-attendance-full"
          >
            <CheckCircle2 className="h-4 w-4 ml-2 text-success" />
            حضور كامل (+10)
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onAction("التزام بالوقت", 5)}
            data-testid="action-on-time"
          >
            <Clock className="h-4 w-4 ml-2 text-info" />
            التزام بالوقت (+5)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="hover-elevate active-elevate-2"
            data-testid="button-delay"
          >
            <Clock className="h-4 w-4 ml-2" />
            التأخير
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => onAction("تأخير بسيط", -2)}
            data-testid="action-delay-minor"
          >
            <Clock className="h-4 w-4 ml-2 text-warning" />
            أقل من 15 دقيقة (-2)
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onAction("تأخير متوسط", -5)}
            data-testid="action-delay-moderate"
          >
            <Clock className="h-4 w-4 ml-2 text-warning" />
            15-60 دقيقة (-5)
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onAction("تأخير كبير", -10)}
            data-testid="action-delay-major"
          >
            <Clock className="h-4 w-4 ml-2 text-destructive" />
            أكثر من ساعة (-10)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        size="sm"
        variant="outline"
        onClick={() => onAction("غياب", -15)}
        data-testid="button-absence"
        className="hover-elevate active-elevate-2"
      >
        <XCircle className="h-4 w-4 ml-2" />
        غياب (-15)
      </Button>

      <DropdownMenuSeparator className="h-6 w-px bg-border" />

      <Button
        size="sm"
        variant="outline"
        onClick={() => onAction("نشاط وتفاعل", 5)}
        data-testid="button-activity"
        className="hover-elevate active-elevate-2"
      >
        <MessageSquare className="h-4 w-4 ml-2" />
        نشاط (+5)
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => onAction("تقرير", 10)}
        data-testid="button-report"
        className="hover-elevate active-elevate-2"
      >
        <FileText className="h-4 w-4 ml-2" />
        تقرير (+10)
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => onAction("ترويج", 15)}
        data-testid="button-promotion"
        className="hover-elevate active-elevate-2"
      >
        <Megaphone className="h-4 w-4 ml-2" />
        ترويج (+15)
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => onAction("اجتماع", 10)}
        data-testid="button-meeting"
        className="hover-elevate active-elevate-2"
      >
        <Calendar className="h-4 w-4 ml-2" />
        اجتماع (+10)
      </Button>

      <DropdownMenuSeparator className="h-6 w-px bg-border" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="hover-elevate active-elevate-2"
            data-testid="button-custom-points"
          >
            نقاط مخصصة
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              const points = prompt("أدخل عدد النقاط (يمكن أن تكون سالبة):");
              if (points) onAction("نقاط مخصصة", parseInt(points));
            }}
            data-testid="action-custom-add"
          >
            <Plus className="h-4 w-4 ml-2 text-success" />
            إضافة نقاط
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              const points = prompt("أدخل عدد النقاط للخصم:");
              if (points) onAction("خصم نقاط", -Math.abs(parseInt(points)));
            }}
            data-testid="action-custom-subtract"
          >
            <Minus className="h-4 w-4 ml-2 text-destructive" />
            خصم نقاط
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
