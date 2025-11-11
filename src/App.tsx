import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginForm } from './components/LoginForm';
import { ScanInstruction } from './components/ScanInstruction';
import { ScanningScreen } from './components/ScanningScreen';
import { PostScanResult } from './components/PostScanResult';
import { DashboardSimple } from './components/DashboardSimple';
import { DeveloperSimple } from './components/DeveloperSimple';

type Screen = 
  | 'splash' 
  | 'welcome' 
  | 'login'
  | 'instruction' 
  | 'scanning' 
  | 'postscan' 
  | 'dashboard'
  | 'developer';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [scanSuccess, setScanSuccess] = useState(true);

  return (
    <div className="relative w-full max-w-md mx-auto bg-[#121212] min-h-screen">
      {/* Mobile viewport container with shadow for better visual on desktop */}
      <div className="relative shadow-2xl">
        {currentScreen === 'splash' && (
          <SplashScreen onComplete={() => setCurrentScreen('welcome')} />
        )}

        {currentScreen === 'welcome' && (
          <WelcomeScreen onContinue={() => setCurrentScreen('login')} />
        )}

        {currentScreen === 'login' && (
          <LoginForm onLogin={() => setCurrentScreen('instruction')} />
        )}

        {currentScreen === 'instruction' && (
          <ScanInstruction onBegin={() => setCurrentScreen('scanning')} />
        )}

        {currentScreen === 'scanning' && (
          <ScanningScreen onComplete={() => {
            // Randomly set success or failure for demo
            setScanSuccess(Math.random() > 0.3); // 70% success rate
            setCurrentScreen('postscan');
          }} />
        )}

        {currentScreen === 'postscan' && (
          <PostScanResult
            success={scanSuccess}
            onGoBack={() => setCurrentScreen('welcome')}
            onRescan={() => setCurrentScreen('scanning')}
            onProceed={() => setCurrentScreen('dashboard')}
          />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardSimple 
            onNavigateToDeveloper={() => setCurrentScreen('developer')} 
          />
        )}

        {currentScreen === 'developer' && (
          <DeveloperSimple onBack={() => setCurrentScreen('dashboard')} />
        )}
      </div>

      {/* Dev Navigation (remove in production) */}
      <div className="fixed bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-xs text-white/60 space-y-1 max-w-xs z-50">
        <div className="text-white/90 mb-2 text-sm">Quick Nav:</div>
        <button onClick={() => setCurrentScreen('splash')} className="block hover:text-white">• Splash</button>
        <button onClick={() => setCurrentScreen('welcome')} className="block hover:text-white">• Welcome</button>
        <button onClick={() => setCurrentScreen('login')} className="block hover:text-white">• Login</button>
        <button onClick={() => setCurrentScreen('instruction')} className="block hover:text-white">• Scan Instruction</button>
        <button onClick={() => setCurrentScreen('scanning')} className="block hover:text-white">• Scanning</button>
        <button onClick={() => {
          setScanSuccess(true);
          setCurrentScreen('postscan');
        }} className="block hover:text-white">• Post-Scan (Success)</button>
        <button onClick={() => {
          setScanSuccess(false);
          setCurrentScreen('postscan');
        }} className="block hover:text-white">• Post-Scan (Failed)</button>
        <button onClick={() => setCurrentScreen('dashboard')} className="block hover:text-white">• Dashboard</button>
        <button onClick={() => setCurrentScreen('developer')} className="block hover:text-white">• Developer API</button>
      </div>
    </div>
  );
}
