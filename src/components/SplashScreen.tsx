interface Props {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: Props) {
  return (
    <div className="w-full h-screen bg-[#121212] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">PulsePass</h1>
        <p className="text-white/60 mt-2">Loading...</p>
      </div>
    </div>
  );
}
