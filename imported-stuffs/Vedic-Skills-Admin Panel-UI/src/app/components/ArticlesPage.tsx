import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface Article {
  id: number;
  title: string;
  tags: string[];
  status: "Draft" | "Published";
  date: string;
}

export function ArticlesPage({ onAddArticle, onEditArticle }: { onAddArticle: () => void; onEditArticle: (id: number) => void }) {
  const articles: Article[] = [
    { id: 1, title: "Understanding Dharma in Modern Life", tags: ["Dharma", "Philosophy"], status: "Published", date: "2026-04-20" },
    { id: 2, title: "The Science of Karma", tags: ["Karma", "Spirituality"], status: "Published", date: "2026-04-19" },
    { id: 3, title: "Meditation for Beginners", tags: ["Meditation", "Practice"], status: "Draft", date: "2026-04-18" },
    { id: 4, title: "Yoga Philosophy Essentials", tags: ["Yoga", "Philosophy"], status: "Published", date: "2026-04-15" },
    { id: 5, title: "Living with Mindfulness", tags: ["Mindfulness", "Practice"], status: "Draft", date: "2026-04-14" },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[rgba(0,0,0,0.08)] px-8 py-6 flex items-center justify-between">
        <h1>Articles</h1>
        <button
          onClick={onAddArticle}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Article
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
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-[rgba(0,0,0,0.06)] last:border-0 hover:bg-[#F8F7F4]/50 transition-colors">
                  <td className="px-6 py-4 text-sm">{article.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5 flex-wrap">
                      {article.tags.map((tag) => (
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
                      article.status === 'Published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{article.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEditArticle(article.id)}
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
