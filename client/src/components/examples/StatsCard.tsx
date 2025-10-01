import StatsCard from "../StatsCard";
import { Users } from "lucide-react";

export default function StatsCardExample() {
  return (
    <div className="p-6">
      <StatsCard
        title="إجمالي المشرفين"
        value={12}
        icon={Users}
        trend="نشط"
      />
    </div>
  );
}
