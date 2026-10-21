import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface MusicControllerProps {
  onInteraction?: () => void;
}

export function MusicController({ onInteraction }: MusicControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsPlaying(romanticAudio.getIsPlaying());
    setIsMuted(romanticAudio.getIsMuted());
  }, []);

  const handleTogglePlay = () => {
    if (onInteraction) onInteraction();
    const playing = romanticAudio.toggleMusic();
    setIsPlaying(playing);
    romanticAudio.playSound('pop');
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = romanticAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      romanticAudio.playSound('pop');
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        onClick={handleTogglePlay}
        className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-full border transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer ${
          isPlaying
            ? 'bg-rose-500/90 text-white border-rose-300 shadow-rose-200/50 hover:bg-rose-600'
            : 'bg-white/90 text-rose-600 border-rose-200 hover:bg-rose-50 shadow-pink-100'
        }`}
        title={isPlaying ? 'Pause romantic music' : 'Play romantic music'}
        aria-label="Toggle romantic music"
      >
        {isPlaying ? (
          <div className="flex items-center gap-1 h-3.5 px-0.5">
            <span className="w-0.5 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-3.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        ) : (
          <Music className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
        )}

        <span className="text-xs font-medium tracking-tight">
          {isPlaying ? 'Music Playing' : 'Play Music 🎶'}
        </span>

        {isPlaying && (
          <button
            onClick={handleToggleMute}
            className="ml-1 p-0.5 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-white/90" /> : <Volume2 className="w-3.5 h-3.5 text-white/90" />}
          </button>
        )}
      </button>
    </div>
  );
}
