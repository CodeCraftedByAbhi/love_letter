/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FloatingParticles } from './components/FloatingParticles';
import { MusicController } from './components/MusicController';
import { ProgressIndicator } from './components/ProgressIndicator';
import { Page1Intro } from './components/Page1Intro';
import { Page2FeelingsLetter } from './components/Page2FeelingsLetter';
import { Page3Question } from './components/Page3Question';
import { Page4SpecialLetter } from './components/Page4SpecialLetter';
import { Page5FinalReveal } from './components/Page5FinalReveal';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden select-none">
      {/* Background Floating Romantic Particles */}
      <FloatingParticles rosePetalsOnly={currentStep === 4 || currentStep === 5} />

      {/* Top Floating Controls */}
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        onSelectStep={handleSelectStep}
      />

      <MusicController />

      {/* Multi-page Screen Transitions */}
      <main className="relative z-10 w-full min-h-screen flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Page1Intro onOpen={handleNextStep} />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Page2FeelingsLetter onNext={handleNextStep} />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Page3Question onYes={handleNextStep} />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Page4SpecialLetter onNext={handleNextStep} />
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Page5FinalReveal onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
