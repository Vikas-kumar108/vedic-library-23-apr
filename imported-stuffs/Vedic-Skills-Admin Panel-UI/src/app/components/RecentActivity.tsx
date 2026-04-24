export function RecentActivity() {
  const activities = [
    { id: 1, text: "New lesson published", time: "2 minutes ago", type: "lesson" },
    { id: 2, text: "User signed up", time: "5 minutes ago", type: "user" },
    { id: 3, text: "Course updated", time: "12 minutes ago", type: "course" },
    { id: 4, text: "Article published", time: "1 hour ago", type: "article" },
    { id: 5, text: "New user registered", time: "2 hours ago", type: "user" },
  ];

  return (
    <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.08)] p-6">
      <h3 className="mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-[rgba(0,0,0,0.06)] last:border-0 last:pb-0">
            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
              activity.type === 'lesson' ? 'bg-primary' :
              activity.type === 'user' ? 'bg-accent' :
              activity.type === 'course' ? 'bg-chart-2' :
              'bg-chart-4'
            }`}></div>
            <div className="flex-1 min-w-0">
              <div className="text-sm">{activity.text}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
