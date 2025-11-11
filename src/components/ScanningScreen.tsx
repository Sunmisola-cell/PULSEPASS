interface Props {
  onComplete: () => void;
}

export function ScanningScreen({ onComplete }: Props) {
  return (
    <div className="w-full h-screen bg-[#121212] flex flex-col items-center justify-center p-6">
      <div className="w-24 h-24 border-4 border-blue-600 rounded-full animate-spin mb-6"></div>
      <h1 className="text-2xl font-bold text-white mb-2">Scanning...</h1>
      <p className="text-white/60 mb-8">Please hold still</p>
      <button
        onClick={onComplete}
        className="text-white/50 hover:text-white text-sm"
      >
        Skip (demo)
      </button>
    </div>
  );
}
