import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export function DailyReflection() {
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-card rounded-[20px] p-6 shadow-sm border border-border">
      <h3 className="text-foreground mb-4">Daily Reflection</h3>

      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="Write what you learned or realized today..."
        className="w-full h-32 p-4 bg-input-background rounded-2xl border border-border resize-none focus:outline-none focus:ring-2 focus:ring-ring"
      />

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Your reflections help deepen understanding.
        </p>

        <button
          onClick={handleSave}
          disabled={!reflection.trim()}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {saved ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Saved
            </>
          ) : (
            'Save Reflection'
          )}
        </button>
      </div>
    </div>
  );
}
