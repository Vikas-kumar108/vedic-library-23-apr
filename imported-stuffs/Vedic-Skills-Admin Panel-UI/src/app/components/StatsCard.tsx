export function StatsCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.08)] p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{icon}</div>
      </div>
      <div className="space-y-1">
        <div className="text-3xl font-medium">{value}</div>
        <div className="text-sm text-muted-foreground">{title}</div>
      </div>
    </div>
  );
}
