import PodiumCard from "../PodiumCard";

export default function PodiumCardExample() {
  return (
    <div className="p-12 grid grid-cols-3 gap-6 items-end">
      <PodiumCard rank={2} name="أحمد محمد" points={145} initials="أم" />
      <PodiumCard rank={1} name="سارة علي" points={180} initials="سع" />
      <PodiumCard rank={3} name="محمود حسن" points={132} initials="مح" />
    </div>
  );
}
