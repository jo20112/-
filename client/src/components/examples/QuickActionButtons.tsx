import QuickActionButtons from "../QuickActionButtons";

export default function QuickActionButtonsExample() {
  const handleAction = (action: string, points: number) => {
    console.log(`Action: ${action}, Points: ${points}`);
  };

  return (
    <div className="p-6">
      <QuickActionButtons onAction={handleAction} />
    </div>
  );
}
