import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, RotateCcw, Share2, Sparkles, Check } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface Page5FinalRevealProps {
  onRestart: () => void;
}

export function Page5FinalReveal({ onRestart }: Page5FinalRevealProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Launch a gentle ongoing ambient heart confetti shimmer
    const timer = setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff4081', '#f50057', '#ff80ab', '#ffffff', '#ffebee'],
      });
      romanticAudio.playSound('celebration');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    const shareText = "A dreamy romantic love letter made just for you, Anshika 💌💖 Open your letter!";
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Letters for Anshika 💌",
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      romanticAudio.playSound('pop');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignored
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e0b1c] via-[#4a1228] to-[#1f0512] text-rose-100 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Dreamy deep rose glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-rose-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-500/15 rounded-full blur-[90px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl mx-auto z-20 flex flex-col items-center text-center"
      >
        {/* Cute Teddy Bear with Glowing Heart */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 15, delay: 0.2 }}
          className="relative mb-6"
        >
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-rose-300/80 shadow-2xl shadow-rose-500/40 animate-float-gentle bg-rose-950">
            <img
              src="/src/assets/images/cute_teddy_bear_heart_1792599244297.jpg"
              alt="Cute teddy bear holding a glowing heart for Anshika"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 text-2xl animate-bounce">
            🎀
          </div>
        </motion.div>

        {/* The Final Letter Container */}
        <div className="w-full bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-rose-300/30 shadow-2xl shadow-rose-900/50 mb-8 relative overflow-hidden">
          {/* Subtle starry background shimmer */}
          <div className="absolute top-3 left-4 text-xs text-rose-300/40">✨</div>
          <div className="absolute top-4 right-6 text-sm text-rose-300/40">🌟</div>
          <div className="absolute bottom-4 left-6 text-sm text-rose-300/40">💫</div>

          {/* Staggered Line Reveals */}
          <div className="space-y-6 sm:space-y-7 text-left">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-4xl sm:text-5xl font-cursive font-bold text-rose-200 tracking-tight text-center sm:text-left"
            >
              Anshikaaa… 🥹💗
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.7 }}
              className="font-handwriting text-2xl sm:text-3xl text-rose-100/90 leading-relaxed"
            >
              Out of all the little coincidences in this world, I'm really glad our paths crossed. 🌎🦋
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.7 }}
              className="font-handwriting text-2xl sm:text-3xl text-rose-100/90 leading-relaxed"
            >
              You make my heart feel things that are difficult to put into words. Every little thought of you brings its own kind of smile. 🫶🏻🌷
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.7 }}
              className="font-handwriting text-2xl sm:text-3xl text-rose-200/95 leading-relaxed italic"
            >
              And if there's one thing I want you to remember after reading this little letter, it's this…
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.1, duration: 0.7 }}
              className="font-handwriting text-2xl sm:text-3xl text-rose-100 leading-relaxed"
            >
              You are special. You are precious. And you deserve all the beautiful things this world has to offer. 🧸💖✨
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.8, duration: 0.7 }}
              className="font-handwriting text-2xl sm:text-3xl text-rose-200 leading-relaxed"
            >
              So, here's my little confession, written with the biggest smile and the softest heart…
            </motion.p>

            {/* THE BIGGEST, MOST VISUALLY STRIKING TEXT ON THE PAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4.5, duration: 0.9, type: 'spring', stiffness: 120 }}
              className="py-6 my-4 text-center relative"
            >
              <div className="absolute inset-0 bg-rose-500/20 blur-2xl rounded-full" />
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-rose-400 drop-shadow-[0_4px_30px_rgba(244,63,94,0.7)] tracking-wide font-cursive">
                  I LOVE YOU, ANSHIKA. ❤️🥹💋
                </h1>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.3, duration: 0.7 }}
              className="font-handwriting text-2xl sm:text-3xl text-rose-200/90 text-center leading-relaxed"
            >
              More than these little words could ever explain. 💌💗🫂
            </motion.p>
          </div>

          {/* End Hallmark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.8 }}
            className="mt-10 pt-6 border-t border-rose-400/20 text-center"
          >
            <p className="font-handwriting text-2xl sm:text-3xl text-rose-300 font-bold flex items-center justify-center gap-2">
              Made with 💗, just for you, Anshika 🎀
            </p>
          </motion.div>
        </div>

        {/* Action Controls: Read Again & Share */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 6.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              romanticAudio.playSound('paper');
              onRestart();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500/30 hover:bg-rose-500/50 text-rose-200 border border-rose-400/40 text-sm font-semibold transition-all cursor-pointer shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Read Again 💌</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-rose-900/40"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Link Copied! 💖' : 'Share with Anshika 💌'}</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
