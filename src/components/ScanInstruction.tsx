interface Props {
  onBegin: () => void;
}

export function ScanInstruction({ onBegin }: Props) {
  return (
    <div className="w-full h-screen bg-[#121212] flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Scan Instructions</h1>
      <div className="max-w-sm space-y-4 text-white/80 mb-8">
        <p>1. Position your finger on the camera</p>
        <p>2. Keep still for 10 seconds</p>
        <p>3. Ensure good lighting</p>
      </div>
      <button
        onClick={onBegin}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg"
      >
        Begin Scan
      </button>
    </div>
  );
}
