import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, MailOpen } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface Page1IntroProps {
  onOpen: () => void;
}

export function Page1Intro({ onOpen }: Page1IntroProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    romanticAudio.playSound('paper');
    romanticAudio.startMusic();

    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-200/50 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md mx-auto text-center z-20 flex flex-col items-center"
      >
        {/* Cute top badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold mb-6 shadow-sm border border-rose-200"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
          <span>A special parcel just for Anshika</span>
          <span className="text-rose-500">🎀</span>
        </motion.div>

        {/* Animated Envelope Container */}
        <div className="relative w-72 sm:w-80 h-52 sm:h-56 mx-auto mb-8 cursor-pointer select-none" onClick={handleOpenClick}>
          {/* Envelope Body */}
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-rose-100 to-rose-200 border-2 border-rose-300 shadow-xl shadow-rose-200/60 overflow-hidden flex items-center justify-center">
            {/* Diagonal envelope fold lines */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 320 220" fill="none">
                <path d="M0 0 L160 125 L320 0" stroke="#f472b6" strokeWidth="2" strokeOpacity="0.4" fill="#ffe4e6" />
                <path d="M0 220 L135 110" stroke="#f472b6" strokeWidth="2" strokeOpacity="0.4" />
                <path d="M320 220 L185 110" stroke="#f472b6" strokeWidth="2" strokeOpacity="0.4" />
              </svg>
            </div>

            {/* Hidden paper letter sliding out when opening */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={isOpening ? { y: -70, opacity: 1, scale: 1.05 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute z-10 w-60 h-44 rounded-xl bg-amber-50/95 border border-rose-200 shadow-md p-4 text-left"
            >
              <div className="h-1.5 w-16 bg-rose-300 rounded-full mb-2" />
              <div className="h-1.5 w-36 bg-rose-200 rounded-full mb-2" />
              <div className="h-1.5 w-28 bg-rose-200 rounded-full mb-3" />
              <div className="font-handwriting text-rose-800 text-lg">Dear Anshikaaa... 💗</div>
            </motion.div>

            {/* Envelope Flap (3D opening fold) */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-28 origin-top z-20"
              animate={isOpening ? { rotateX: 180, opacity: 0.4 } : { rotateX: 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <svg className="w-full h-full drop-shadow-md" viewBox="0 0 320 120" preserveAspectRatio="none">
                <polygon points="0,0 160,115 320,0" fill="#fbcfe8" stroke="#f472b6" strokeWidth="2" />
              </svg>
            </motion.div>

            {/* Central Wax Seal Stamp */}
            <motion.div
              animate={isOpening ? { scale: 0, opacity: 0 } : { scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute z-30 w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 shadow-lg shadow-rose-500/40 border-2 border-rose-300 flex flex-col items-center justify-center text-white"
            >
              <Heart className="w-6 h-6 fill-rose-100 text-rose-100 drop-shadow-sm" />
              <span className="text-[10px] font-bold tracking-wider -mt-0.5">A &bull; 💌</span>
            </motion.div>

            {/* Little Teddy peek & stamp */}
            <div className="absolute top-3 right-3 text-2xl rotate-6 animate-pulse select-none">
              🧸
            </div>
            <div className="absolute bottom-3 left-4 text-xs font-serif italic text-rose-500 tracking-wider">
              For: Anshika 🌷
            </div>
          </div>

          {/* Little Sparkle accents around envelope */}
          <div className="absolute -top-3 -right-3 text-xl animate-bounce" style={{ animationDuration: '2.5s' }}>
            ✨
          </div>
          <div className="absolute -bottom-2 -left-2 text-xl animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' }}>
            🌸
          </div>
        </div>

        {/* Text Section */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl font-cursive font-bold text-rose-950 mb-3 tracking-tight"
        >
          Hey Anshikaaa 🥹💗🎀
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="space-y-2 text-rose-900/90 text-base sm:text-lg mb-8 max-w-sm px-2 leading-relaxed"
        >
          <p className="font-handwriting text-2xl text-rose-700 font-semibold">
            I made a little something for you… 👉👈💌
          </p>
          <p className="text-sm sm:text-base text-rose-800">
            It's not just a letter, it's a tiny piece of my heart. ❤️
          </p>
          <p className="text-sm sm:text-base font-medium text-rose-900 pt-1">
            Will you open it, pretty girl? 🧸🌷
          </p>
        </motion.div>

        {/* Animated Open Button */}
        <motion.button
          onClick={handleOpenClick}
          disabled={isOpening}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 bg-size-200 text-white font-semibold text-base sm:text-lg shadow-lg shadow-rose-300/60 hover:shadow-xl hover:shadow-rose-400/70 border border-rose-300 transition-all cursor-pointer overflow-hidden"
        >
          <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <MailOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="tracking-wide">Open My Letter 💌</span>
          <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
        </motion.button>

        <p className="text-xs text-rose-600/80 mt-4 flex items-center justify-center gap-1">
          <span>Tap to unveil a piece of magic</span>
          <span>✨</span>
        </p>
      </motion.div>
    </div>
  );
}
