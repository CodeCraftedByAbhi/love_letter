import { motion } from 'motion/react';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface Page2FeelingsLetterProps {
  onNext: () => void;
}

export function Page2FeelingsLetter({ onNext }: Page2FeelingsLetterProps) {
  const handleNext = () => {
    romanticAudio.playSound('pop');
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute -top-10 right-0 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-0 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl mx-auto z-20 flex flex-col items-center"
      >
        {/* Envelope back container showing letter sliding out */}
        <div className="w-full relative">
          {/* Decorative stamp in top right */}
          <div className="absolute -top-3 right-4 sm:right-8 z-30 flex items-center gap-2">
            <div className="bg-rose-50 border-2 border-dashed border-rose-300 p-1.5 rounded-md shadow-sm rotate-3 flex items-center gap-1">
              <span className="text-sm">📮</span>
              <span className="text-[10px] font-mono font-bold text-rose-500 uppercase tracking-tighter">ANSHIKA-EXP</span>
            </div>
            <div className="text-xl rotate-12">🧸</div>
          </div>

          {/* Realistic Paper Stationery Card */}
          <motion.div
            initial={{ scaleY: 0.85, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="w-full paper-texture rounded-3xl p-6 sm:p-10 border-2 border-rose-200/90 soft-card-shadow relative overflow-hidden"
          >
            {/* Soft decorative ribbon watermark */}
            <div className="absolute top-0 left-8 w-12 h-4 bg-rose-300/30 rounded-b-md" />

            {/* Letter Header */}
            <div className="border-b border-rose-100 pb-4 mb-6 flex items-baseline justify-between">
              <div>
                <h2 className="text-3xl sm:text-4xl font-cursive font-bold text-rose-900 tracking-tight">
                  Dear Anshikaaa, 💗🥹
                </h2>
                <p className="text-xs font-serif italic text-rose-400 mt-1">Written with all my heart</p>
              </div>
              <Sparkles className="w-5 h-5 text-rose-400" />
            </div>

            {/* Letter Content */}
            <div className="space-y-4 font-handwriting text-xl sm:text-2xl text-rose-950/90 leading-relaxed sm:leading-loose">
              <p>
                I don't know how to explain it, but there's something about you that makes my heart smile in the cutest way possible. 🫶🏻💖
              </p>

              <p>
                Sometimes, it's not about grand gestures or perfect words. It's about that one person who makes an ordinary day feel a little more special. And somehow, you have that magic. ✨🌷
              </p>

              <p>
                If I could send you one thing in this world, I'd send you a mirror… so you could see how incredibly adorable and special you are to me. 🪞🥹💝
              </p>

              <p>
                And if I could give you one feeling, I'd let you feel what happens in my heart whenever I think about you. 🦋❤️
              </p>
            </div>

            {/* Letter Signoff */}
            <div className="mt-8 pt-4 border-t border-rose-100 flex flex-col items-end">
              <div className="text-right">
                <p className="font-handwriting text-xl text-rose-800">
                  Yours with the softest feelings,
                </p>
                <p className="font-cursive text-2xl sm:text-3xl font-bold text-rose-600 mt-1">
                  Someone who thinks you're pretty special. 💌🧸
                </p>
              </div>
            </div>

            {/* Cute bottom decorative elements */}
            <div className="mt-6 flex items-center justify-between text-rose-300 text-xs font-serif italic pt-2">
              <span className="flex items-center gap-1 text-rose-400">
                <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-300" /> Page 1 of letters
              </span>
              <span>🎀 🌷 💖</span>
            </div>
          </motion.div>
        </div>

        {/* Animated Next Button */}
        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="mt-8 inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-base sm:text-lg shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 border border-rose-300 transition-all cursor-pointer"
        >
          <span>Next Letter, Anshika</span>
          <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  );
}
