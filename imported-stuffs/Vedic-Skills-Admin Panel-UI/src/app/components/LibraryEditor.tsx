import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export function LibraryEditor({ onBack, libraryId }: { onBack: () => void; libraryId?: number }) {
  const [selectedTags, setSelectedTags] = useState<string[]>(["Dharma"]);
  const availableTags = ["Dharma", "Karma", "Yoga", "Philosophy", "Spirituality"];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[rgba(0,0,0,0.08)] px-8 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-[#F8F7F4] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1>{libraryId ? "Edit Library Content" : "New Library Content"}</h1>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          <form className="space-y-6">
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                placeholder="e.g., Bhagavad Gita 2.47"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="mb-4">Sections</h3>

              <div className="space-y-6">
                <div>
                  <label className="block mb-2">Sanskrit</label>
                  <div className="border border-border rounded-lg bg-white">
                    <div className="border-b border-border px-4 py-2 flex gap-2">
                      <button type="button" className="px-3 py-1 rounded hover:bg-[#F8F7F4] text-sm">
                        Bold
                      </button>
                      <button type="button" className="px-3 py-1 rounded hover:bg-[#F8F7F4] text-sm">
                        Italic
                      </button>
                    </div>
                    <textarea
                      rows={4}
                      placeholder="Enter Sanskrit text..."
                      className="w-full px-4 py-3 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2">Translation</label>
                  <div className="border border-border rounded-lg bg-white">
                    <div className="border-b border-border px-4 py-2 flex gap-2">
                      <button type="button" className="px-3 py-1 rounded hover:bg-[#F8F7F4] text-sm">
                        Bold
                      </button>
                      <button type="button" className="px-3 py-1 rounded hover:bg-[#F8F7F4] text-sm">
                        Italic
                      </button>
                      <button type="button" className="px-3 py-1 rounded hover:bg-[#F8F7F4] text-sm">
                        Quote
                      </button>
                    </div>
                    <textarea
                      rows={5}
                      placeholder="Enter translation..."
                      className="w-full px-4 py-3 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2">Purport</label>
                  <div className="border border-border rounded-lg bg-white">
                    <div className="border-b border-border px-4 py-2 flex gap-2">
                      <button type="button" className="px-3 py-1 rounded hover:bg-[#F8F7F4] text-sm">
                        H2
                      </button>
                      <button type="button" className="px-3 py-1 rounded hover:bg-[#F8F7F4] text-sm">
                        H3
                      </button>
                      <button type="button" className="px-3 py-1 rounded hover:bg-[#F8F7F4] text-sm">
                        Bold
                      </button>
                      <button type="button" className="px-3 py-1 rounded hover:bg-[#F8F7F4] text-sm">
                        Italic
                      </button>
                      <button type="button" className="px-3 py-1 rounded hover:bg-[#F8F7F4] text-sm">
                        Quote
                      </button>
                      <button type="button" className="px-3 py-1 rounded hover:bg-[#F8F7F4] text-sm">
                        Link
                      </button>
                    </div>
                    <textarea
                      rows={12}
                      placeholder="Enter purport (explanation and commentary)..."
                      className="w-full px-4 py-3 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-3">Tags</label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-lg border transition-colors text-sm ${
                      selectedTags.includes(tag)
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-white hover:bg-[#F8F7F4]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-20"></div>
          </form>
        </div>
      </main>

      <div className="sticky bottom-0 bg-white border-t border-[rgba(0,0,0,0.08)] px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            type="button"
            className="px-6 py-2.5 rounded-lg border border-border hover:bg-[#F8F7F4] transition-colors"
          >
            Save Draft
          </button>

          <button
            type="button"
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
