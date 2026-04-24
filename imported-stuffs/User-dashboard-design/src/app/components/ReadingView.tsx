import { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface ReadingViewProps {
  item: {
    title: string;
    type: 'Verse' | 'Article';
    translation: string;
    purport: string;
  };
  onBack: () => void;
}

export function ReadingView({ item, onBack }: ReadingViewProps) {
  const [activeTab, setActiveTab] = useState<'translation' | 'purport'>('translation');
  const [note, setNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  const handleSaveNote = () => {
    if (note.trim()) {
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Library</span>
      </button>

      <div className="bg-card rounded-[20px] p-8 shadow-sm border border-border mb-6">
        <h1 className="text-foreground mb-6">{item.title}</h1>

        <div className="flex gap-2 mb-8 bg-muted p-1 rounded-full w-fit">
          <button
            onClick={() => setActiveTab('translation')}
            className={`px-6 py-2.5 rounded-full transition-all ${
              activeTab === 'translation'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Translation
          </button>
          <button
            onClick={() => setActiveTab('purport')}
            className={`px-6 py-2.5 rounded-full transition-all ${
              activeTab === 'purport'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Purport
          </button>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-foreground/90 leading-relaxed text-lg">
            {activeTab === 'translation' ? item.translation : item.purport}
          </p>
        </div>
      </div>

      <div className="bg-card rounded-[20px] p-8 shadow-sm border border-border">
        <h3 className="text-foreground mb-4">Your Notes</h3>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your insight..."
          className="w-full h-40 p-4 bg-input-background rounded-2xl border border-border resize-none focus:outline-none focus:ring-2 focus:ring-ring mb-4"
        />

        <div className="flex justify-end">
          <button
            onClick={handleSaveNote}
            disabled={!note.trim()}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {noteSaved ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Saved
              </>
            ) : (
              'Save Note'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
