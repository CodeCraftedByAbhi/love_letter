import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface Page4SpecialLetterProps {
  onNext: () => void;
}

export function Page4SpecialLetter({ onNext }: Page4SpecialLetterProps) {
  const handleNext = () => {
    romanticAudio.playSound('paper');
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Dreamy rose petals gradient backdrop */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-rose-200/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl mx-auto z-20 flex flex-col items-center"
      >
        {/* Decorative Top Banner */}
        <div className="flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs font-medium">
          <span>🌹</span>
          <span>A letter penned straight from the soul</span>
          <span>💌</span>
        </div>

        {/* Textured Cream Stationery Card */}
        <div className="w-full paper-texture rounded-3xl p-6 sm:p-10 border-2 border-rose-200/80 soft-card-shadow relative overflow-hidden">
          {/* Subtle rose illustration / photo accent */}
          <div className="flex items-center justify-between border-b border-rose-100 pb-5 mb-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-cursive font-bold text-rose-900 tracking-tight">
                My Dearest Anshika, 🌹💌
              </h2>
              <p className="text-xs font-serif italic text-rose-500 mt-1">To the girl who lights up everything</p>
            </div>
            
            {/* Cute mini framed picture of teddy with roses */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-rose-300 shadow-sm shrink-0 rotate-3 bg-pink-100">
              <img
                src="/src/assets/images/teddy_holding_roses_1792599244477.jpg"
                alt="Teddy holding roses for Anshika"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Letter Prose */}
          <div className="space-y-4 font-handwriting text-xl sm:text-2xl text-rose-950/90 leading-relaxed sm:leading-loose">
            <p>
              If I could turn my feelings into flowers, I'd give you an endless garden. 🌷🌹🌻
            </p>

            <p>
              If I could turn my thoughts into stars, your night sky would never be dark. ✨🌙
            </p>

            <p>
              And if I could turn every smile you give me into a memory, I'd have a thousand little reasons to smile every single day. 🥹💖
            </p>

            <p>
              Anshika, you deserve the kind of love that feels safe, warm, genuine, and beautiful. The kind that remembers the little things, celebrates your happiness, and stays beside you through ordinary days and extraordinary moments. 🫂❤️
            </p>

            <p>
              I can't promise to be perfect, but I can promise to be genuine with my feelings and to keep choosing kindness, honesty, and effort. 💗🧿
            </p>

            <p>
              You are a little bit of sunshine, a little bit of magic, and a whole lot of adorable. ☀️🦋🧸
            </p>

            <p>
              And honestly? That's a pretty dangerous combination for my heart. 😂💘
            </p>
          </div>

          {/* Letter Signoff */}
          <div className="mt-8 pt-6 border-t border-rose-100 flex flex-col items-end">
            <div className="text-right">
              <p className="font-handwriting text-xl text-rose-800">
                With all my softest feelings,
              </p>
              <p className="font-cursive text-2xl sm:text-3xl font-bold text-rose-600 mt-1">
                For Anshika, always. 💌🎀
              </p>
            </div>
          </div>

          {/* Delicate bottom floral motif */}
          <div className="mt-6 flex items-center justify-center gap-2 text-rose-300 text-sm">
            <span>🌸</span>
            <span>•</span>
            <span>🌹</span>
            <span>•</span>
            <span>🌷</span>
          </div>
        </div>

        {/* One Last Thing Button */}
        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: [1, 1.04, 1],
            boxShadow: [
              '0 10px 25px -5px rgba(244, 114, 182, 0.3)',
              '0 15px 35px -5px rgba(244, 114, 182, 0.5)',
              '0 10px 25px -5px rgba(244, 114, 182, 0.3)',
            ],
          }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-base sm:text-lg shadow-xl border border-rose-300 transition-all cursor-pointer"
        >
          <span>One Last Thing… 💝</span>
          <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
