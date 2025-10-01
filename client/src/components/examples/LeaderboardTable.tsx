import LeaderboardTable, { Admin } from "../LeaderboardTable";

export default function LeaderboardTableExample() {
  const mockAdmins: Admin[] = [
    { id: "1", name: "سارة علي", initials: "سع", totalPoints: 180, attendance: 25, delays: 2, absences: 0 },
    { id: "2", name: "أحمد محمد", initials: "أم", totalPoints: 145, attendance: 22, delays: 4, absences: 1 },
    { id: "3", name: "محمود حسن", initials: "مح", totalPoints: 132, attendance: 20, delays: 5, absences: 2 },
    { id: "4", name: "فاطمة أحمد", initials: "فأ", totalPoints: 115, attendance: 18, delays: 6, absences: 3 },
  ];

  const handleAction = (adminId: string, action: string, points: number) => {
    console.log(`Admin: ${adminId}, Action: ${action}, Points: ${points}`);
  };

  return (
    <div className="p-6">
      <LeaderboardTable admins={mockAdmins} onAction={handleAction} />
    </div>
  );
}
