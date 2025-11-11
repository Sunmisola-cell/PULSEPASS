interface Props {
  success: boolean;
  onGoBack: () => void;
  onRescan: () => void;
  onProceed: () => void;
}

export function PostScanResult({ success, onGoBack, onRescan, onProceed }: Props) {
  return (
    <div className="w-full h-screen bg-[#121212] flex flex-col items-center justify-center p-6">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${success ? 'bg-green-600' : 'bg-red-600'}`}>
        <span className="text-2xl text-white">{success ? '✓' : '✗'}</span>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">
        {success ? 'Scan Successful!' : 'Scan Failed'}
      </h1>
      <p className="text-white/60 mb-8 text-center">
        {success ? 'Your pulse scan was completed successfully.' : 'Please try scanning again.'}
      </p>
      <div className="flex gap-4">
        {!success && (
          <button onClick={onRescan} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
            Rescan
          </button>
        )}
        {success && (
          <button onClick={onProceed} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
            Continue
          </button>
        )}
        <button onClick={onGoBack} className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg">
          Back
        </button>
      </div>
    </div>
  );
}
