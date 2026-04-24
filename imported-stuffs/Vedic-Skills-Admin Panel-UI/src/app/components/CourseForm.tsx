import { useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";

export function CourseForm({ onBack, courseId }: { onBack: () => void; courseId?: number }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const availableTags = ["Dharma", "Karma", "Meditation", "Yoga", "Philosophy", "Spirituality", "Beginner", "Advanced"];

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
        <h1>{courseId ? "Edit Course" : "New Course"}</h1>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto p-8">
          <form className="space-y-6">
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                placeholder="Enter course title"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block mb-2">Description</label>
              <textarea
                rows={5}
                placeholder="Enter course description"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            <div>
              <label className="block mb-2">Thumbnail</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-[#F8F7F4] transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
              </div>
            </div>

            <div>
              <label className="block mb-3">Course Tags (Optional)</label>
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
        <div className="max-w-3xl mx-auto flex items-center justify-end">
          <button
            type="button"
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Save Course
          </button>
        </div>
      </div>
    </div>
  );
}
