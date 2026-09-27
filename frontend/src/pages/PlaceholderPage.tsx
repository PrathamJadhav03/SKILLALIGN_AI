import { Construction } from 'lucide-react';

interface PlaceholderProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
        <Construction size={40} className="text-indigo-600" />
      </div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">{title}</h1>
      <p className="text-slate-500 max-w-md">
        This module is currently under construction for Phase 2+ of the Master Rebuild Plan.
      </p>
    </div>
  );
}
