import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface Page3QuestionProps {
  onYes: () => void;
}

const ESCAPE_MESSAGES = [
  'Hehe, too slow! 🙈💕',
  'Are you sure, Anshika? 🥺👉👈',
  'Nooo, try again! 🏃🏻‍♀️💨',
  'That button has other plans 😂💗',
  'Pookie, think again! 🧸💋',
  'System error: NO is disabled for Anshika! 😜🎀',
  'The universe says YES is the only option! ✨💍',
];

export function Page3Question({ onYes }: Page3QuestionProps) {
  const [escapeCount, setEscapeCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [noPos, setNoPos] = useState({ x: 0, y: 0, rotate: 0 });
  const [hasAccepted, setHasAccepted] = useState(false);
  const playgroundRef = useRef<HTMLDivElement | null>(null);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);

  // Playful dodging algorithm
  const moveNoButton = useCallback(() => {
    romanticAudio.playSound('dodge');
    setEscapeCount((prev) => {
      const nextCount = prev + 1;
      setCurrentMessage(ESCAPE_MESSAGES[nextCount % ESCAPE_MESSAGES.length]);
      return nextCount;
    });

    if (!playgroundRef.current) return;
    const rect = playgroundRef.current.getBoundingClientRect();

    // Safe boundaries: stay within playground and avoid overlapping center YES button
    const maxOffsetWidth = Math.min(rect.width * 0.38, 140);
    const maxOffsetHeight = Math.min(rect.height * 0.32, 90);

    // Random offset with slight rotation
    const randomSignX = Math.random() > 0.5 ? 1 : -1;
    const randomSignY = Math.random() > 0.5 ? 1 : -1;

    const newX = (Math.random() * (maxOffsetWidth - 20) + 20) * randomSignX;
    const newY = (Math.random() * (maxOffsetHeight - 20) + 20) * randomSignY;
    const newRotate = (Math.random() - 0.5) * 35;

    setNoPos({ x: newX, y: newY, rotate: newRotate });
  }, []);

  const handleMouseEnterNo = () => {
    moveNoButton();
  };

  const handleTouchNo = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    moveNoButton();
  };

  const handleYesClick = () => {
    setHasAccepted(true);
    romanticAudio.playSound('celebration');

    // Multi-stage romantic confetti celebration
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#ec4899', '#f472b6', '#fb7185', '#ffffff'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f43f5e', '#ec4899', '#f472b6', '#fb7185', '#ffffff'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      onYes();
    }, 2800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden select-none">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-rose-200/50 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-xl mx-auto z-20 flex flex-col items-center text-center"
      >
        {/* Scrapbook Container */}
        <div
          ref={playgroundRef}
          className="w-full relative paper-texture rounded-3xl p-6 sm:p-10 border-2 border-rose-300 soft-card-shadow overflow-hidden"
        >
          {/* Washi tape stickers in corners */}
          <div className="absolute -top-3 left-10 w-24 h-6 bg-rose-200/80 -rotate-3 rounded-sm shadow-xs border border-rose-300/60 pointer-events-none" />
          <div className="absolute -top-3 right-10 w-24 h-6 bg-pink-200/80 rotate-2 rounded-sm shadow-xs border border-pink-300/60 pointer-events-none" />

          {/* Cute Little Teddy and Gift Box Sticker */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl animate-bounce" style={{ animationDuration: '2s' }}>🧸</span>
            <span className="text-3xl animate-pulse">🎁</span>
            <span className="text-4xl animate-bounce" style={{ animationDuration: '2.4s', animationDelay: '0.4s' }}>🌷</span>
          </div>

          {/* Scrapbook Heading */}
          <h2 className="text-3xl sm:text-4xl font-cursive font-bold text-rose-950 mb-4 tracking-tight">
            Anshikaaa, can I ask you something? 🥹👉👈💗
          </h2>

          <div className="w-16 h-1 bg-rose-300 mx-auto rounded-full mb-6" />

          {/* The Big Question */}
          <p className="font-handwriting text-2xl sm:text-3xl font-bold text-rose-800 leading-relaxed max-w-md mx-auto mb-8">
            Would you make my little world a little more magical by being my special person? 🧸💖🌎
          </p>

          {/* Escaping Message Toast when NO button runs away */}
          <div className="h-8 mb-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {currentMessage && (
                <motion.div
                  key={currentMessage}
                  initial={{ opacity: 0, y: 5, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs sm:text-sm font-semibold border border-pink-200 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                  <span>{currentMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive Buttons Arena */}
          <div className="relative min-h-[160px] flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 pt-2 pb-6">
            {/* The Stable, Glowing, Obvious YES Button */}
            <motion.button
              onClick={handleYesClick}
              disabled={hasAccepted}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              animate={{
                scale: [1, 1.04, 1],
                boxShadow: [
                  '0 10px 25px -5px rgba(244, 63, 94, 0.4)',
                  '0 15px 35px -5px rgba(244, 63, 94, 0.6)',
                  '0 10px 25px -5px rgba(244, 63, 94, 0.4)',
                ],
              }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="z-20 min-h-[54px] min-w-[200px] sm:min-w-[220px] px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-lg sm:text-xl shadow-lg border-2 border-rose-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <Heart className="w-6 h-6 fill-white text-white animate-pulse" />
              <span>YESSSS 😭💗💍</span>
            </motion.button>

            {/* The Funny Playful Dodging NO Button */}
            <motion.button
              ref={noButtonRef}
              onMouseEnter={handleMouseEnterNo}
              onTouchStart={handleTouchNo}
              onClick={moveNoButton}
              animate={{
                x: noPos.x,
                y: noPos.y,
                rotate: noPos.rotate,
                scale: escapeCount > 5 ? 0.85 : 1,
              }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="z-10 min-h-[46px] min-w-[130px] px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-base border border-slate-300 shadow-sm cursor-pointer select-none transition-colors"
            >
              <span>{escapeCount > 6 ? 'Okay fine 🙈' : 'NO 🙈'}</span>
            </motion.button>
          </div>

          <p className="text-xs text-rose-400 font-serif italic mt-2">
            P.S. Some buttons know what's in your heart better than you do! 🤫💖
          </p>
        </div>

        {/* Celebration Overlay when YES is clicked */}
        <AnimatePresence>
          {hasAccepted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-rose-950/70 backdrop-blur-md px-4 text-center"
            >
              <motion.div
                animate={{ scale: [0.9, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl p-8 max-w-md border-4 border-rose-300 shadow-2xl flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center text-4xl mb-4 animate-bounce">
                  💍
                </div>
                <h3 className="text-3xl sm:text-4xl font-cursive font-bold text-rose-600 mb-2">
                  She said YESSSS! 😭💗💍
                </h3>
                <p className="font-handwriting text-2xl text-rose-800 mb-4">
                  My heart just did a thousand backflips, Anshika! 🧸✨
                </p>
                <div className="flex items-center gap-2 text-rose-500 font-medium text-sm">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Opening your special handwritten letter next...</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
