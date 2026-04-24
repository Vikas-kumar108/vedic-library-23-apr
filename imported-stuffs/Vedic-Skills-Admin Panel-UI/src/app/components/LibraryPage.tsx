import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface LibraryItem {
  id: number;
  title: string;
  tags: string[];
  status: "Draft" | "Published";
  date: string;
}

export function LibraryPage({ onAddLibrary, onEditLibrary }: { onAddLibrary: () => void; onEditLibrary: (id: number) => void }) {
  const items: LibraryItem[] = [
    { id: 1, title: "Bhagavad Gita 2.47", tags: ["Dharma", "Karma"], status: "Published", date: "2026-04-20" },
    { id: 2, title: "Bhagavad Gita 3.35", tags: ["Dharma"], status: "Published", date: "2026-04-19" },
    { id: 3, title: "Bhagavad Gita 6.5", tags: ["Yoga", "Philosophy"], status: "Draft", date: "2026-04-18" },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[rgba(0,0,0,0.08)] px-8 py-6 flex items-center justify-between">
        <h1>Library</h1>
        <button
          onClick={onAddLibrary}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Content
        </button>
      </header>

      <main className="flex-1 p-8 overflow-auto">
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.08)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(0,0,0,0.08)] bg-[#F8F7F4]">
                <th className="text-left px-6 py-3 text-sm font-medium text-foreground">Title</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-foreground">Tags</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-foreground">Status</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-foreground">Date</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-[rgba(0,0,0,0.06)] last:border-0 hover:bg-[#F8F7F4]/50 transition-colors">
                  <td className="px-6 py-4 text-sm">{item.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5 flex-wrap">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-accent/20 text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${
                      item.status === 'Published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{item.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEditLibrary(item.id)}
                        className="p-1.5 rounded hover:bg-secondary transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-primary" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-secondary transition-colors">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
