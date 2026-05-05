import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

export default function Profile({ 
  currentName, 
  onUpdateName, 
  onReset 
}: { 
  currentName: string;
  onUpdateName: (name: string) => void;
  onReset: () => void;
}) {
  const [name, setName] = useState(currentName);
  const [isResetConfirming, setIsResetConfirming] = useState(false);

  const handleSave = () => {
    if (name.trim()) {
      onUpdateName(name.trim());
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-zinc-100 tracking-tight">Profile & Settings</h2>
        <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
          Manage your personal details and app data.
        </p>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 max-w-2xl">
        <CardHeader>
          <CardTitle>Your Name</CardTitle>
          <CardDescription className="text-zinc-400">
            This is stored locally in your browser to personalize your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 max-w-sm block"
          />
          <Button onClick={handleSave} disabled={!name.trim() || name.trim() === currentName}>
            Save Profile
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-red-900/30 max-w-2xl">
        <CardHeader>
          <CardTitle className="text-red-400">Danger Zone</CardTitle>
          <CardDescription className="text-zinc-400">
            Resetting your progress will delete all checklist completions and your review log. This cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isResetConfirming ? (
            <Button variant="outline" className="text-red-400 border-red-900/50 hover:bg-red-950/50" onClick={() => setIsResetConfirming(true)}>
              Reset All Progress
            </Button>
          ) : (
            <div className="space-y-4 bg-red-950/20 p-4 rounded-lg border border-red-900/50">
              <p className="text-sm text-zinc-300">Are you absolutely sure you want to delete all saved data?</p>
              <div className="flex gap-3">
                <Button variant="outline" className="text-red-400 border-red-900/50 hover:bg-red-900/50" onClick={() => {
                  onReset();
                  setIsResetConfirming(false);
                }}>
                  Yes, Delete Everything
                </Button>
                <Button variant="secondary" onClick={() => setIsResetConfirming(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
