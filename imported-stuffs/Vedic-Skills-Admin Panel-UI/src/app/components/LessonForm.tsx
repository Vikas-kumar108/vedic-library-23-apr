import { useState } from "react";
import { ArrowLeft, Plus, X, Upload, Eye } from "lucide-react";

export function LessonForm({ onBack, lessonId }: { onBack: () => void; lessonId?: number }) {
  const [lessonType, setLessonType] = useState<"Video" | "Article" | "Audio">("Video");
  const [keyPoints, setKeyPoints] = useState<string[]>(["", ""]);
  const [status, setStatus] = useState<"Draft" | "Published">("Draft");

  const addKeyPoint = () => {
    setKeyPoints([...keyPoints, ""]);
  };

  const removeKeyPoint = (index: number) => {
    setKeyPoints(keyPoints.filter((_, i) => i !== index));
  };

  const updateKeyPoint = (index: number, value: string) => {
    const updated = [...keyPoints];
    updated[index] = value;
    setKeyPoints(updated);
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
        <h1>{lessonId ? "Edit Lesson" : "Add New Lesson"}</h1>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto p-8">
          <form className="space-y-6">
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                placeholder="Enter lesson title"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block mb-2">Course</label>
              <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="">Select a course</option>
                <option value="1">React Fundamentals</option>
                <option value="2">TypeScript Mastery</option>
                <option value="3">Modern CSS</option>
                <option value="4">JavaScript Advanced</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">Lesson Type</label>
              <div className="flex gap-3">
                {(["Video", "Article", "Audio"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setLessonType(type)}
                    className={`flex-1 px-4 py-3 rounded-lg border transition-colors ${
                      lessonType === type
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-white hover:bg-[#F8F7F4]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {lessonType === "Video" && (
              <div>
                <label className="block mb-2">Video URL</label>
                <input
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            )}

            <div>
              <label className="block mb-2">Content</label>
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
                  rows={12}
                  placeholder="Write your lesson content here..."
                  className="w-full px-4 py-3 focus:outline-none resize-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label>Key Points</label>
                <button
                  type="button"
                  onClick={addKeyPoint}
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <Plus className="w-4 h-4" />
                  Add Point
                </button>
              </div>
              <div className="space-y-2">
                {keyPoints.map((point, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => updateKeyPoint(index, e.target.value)}
                      placeholder={`Key point ${index + 1}`}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    {keyPoints.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeKeyPoint(index)}
                        className="p-2.5 rounded-lg hover:bg-destructive/10 text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">Order</label>
                <input
                  type="number"
                  min="1"
                  placeholder="1"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "Draft" | "Published")}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2">Thumbnail (Optional)</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-[#F8F7F4] transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
              </div>
            </div>

            <div className="h-20"></div>
          </form>
        </div>
      </main>

      <div className="sticky bottom-0 bg-white border-t border-[rgba(0,0,0,0.08)] px-8 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            type="button"
            className="px-6 py-2.5 rounded-lg border border-border hover:bg-[#F8F7F4] transition-colors"
          >
            Save Draft
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border hover:bg-[#F8F7F4] transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              type="button"
              className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Publish Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
