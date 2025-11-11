interface Props {
  onLogin: () => void;
}

export function LoginForm({ onLogin }: Props) {
  return (
    <div className="w-full h-screen bg-[#121212] flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-white mb-8">Login</h1>
      <div className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 bg-white/10 text-white placeholder-white/50 rounded-lg border border-white/20"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 bg-white/10 text-white placeholder-white/50 rounded-lg border border-white/20"
        />
        <button
          onClick={onLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}
