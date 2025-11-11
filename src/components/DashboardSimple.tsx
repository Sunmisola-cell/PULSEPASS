interface Props {
  onNavigateToDeveloper: () => void;
}

export function DashboardSimple({ onNavigateToDeveloper }: Props) {
  return (
    <div className="w-full h-screen bg-[#121212] flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
      <div className="max-w-sm space-y-6">
        <div className="bg-white/10 p-6 rounded-lg border border-white/20">
          <h2 className="text-white font-semibold mb-2">Heart Rate</h2>
          <p className="text-3xl font-bold text-green-400">72 BPM</p>
        </div>
        <div className="bg-white/10 p-6 rounded-lg border border-white/20">
          <h2 className="text-white font-semibold mb-2">Status</h2>
          <p className="text-white/70">Healthy</p>
        </div>
        <button
          onClick={onNavigateToDeveloper}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
        >
          Developer API
        </button>
      </div>
    </div>
  );
}
