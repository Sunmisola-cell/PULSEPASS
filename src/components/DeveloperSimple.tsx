interface Props {
  onBack: () => void;
}

export function DeveloperSimple({ onBack }: Props) {
  return (
    <div className="w-full h-screen bg-[#121212] flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-white mb-8">Developer API</h1>
      <div className="max-w-sm bg-white/10 p-6 rounded-lg border border-white/20 mb-8">
        <p className="text-white/80 font-mono text-sm">
          <span className="text-blue-400">GET</span> /api/health/status
        </p>
        <p className="text-white/80 font-mono text-sm mt-2">
          <span className="text-blue-400">POST</span> /api/scans/new
        </p>
      </div>
      <button
        onClick={onBack}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg"
      >
        Back
      </button>
    </div>
  );
}
