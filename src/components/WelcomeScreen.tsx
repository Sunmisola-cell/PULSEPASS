interface Props {
  onContinue: () => void;
}

export function WelcomeScreen({ onContinue }: Props) {
  return (
    <div className="w-full h-screen bg-[#121212] flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-white mb-4">Welcome to PulsePass</h1>
      <p className="text-white/70 text-center mb-8">
        Your health scanning companion
      </p>
      <button
        onClick={onContinue}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
      >
        Continue
      </button>
    </div>
  );
}
