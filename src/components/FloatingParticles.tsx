import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotSpeed: number;
  char: string;
}

export function FloatingParticles({ rosePetalsOnly = false }: { rosePetalsOnly?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const emojis = rosePetalsOnly
      ? ['🌸', '🌹', '🌷', '✨', '💖']
      : ['💗', '✨', '🌸', '🧸', '💕', '🌷', '🎀', '🦋', '⭐', '❤️'];

    const particleCount = window.innerWidth < 640 ? 22 : 36;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 14 + (rosePetalsOnly ? 16 : 12),
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() * 0.6 + 0.3) * (rosePetalsOnly ? 1.2 : -0.7),
        opacity: Math.random() * 0.45 + 0.25,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.2,
        char: emojis[Math.floor(Math.random() * emojis.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        // Wrap around boundaries
        if (p.y < -30) p.y = height + 20;
        if (p.y > height + 30) p.y = -20;
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    // Interactive tap/click spawning
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      for (let i = 0; i < 4; i++) {
        particles.push({
          x: clientX,
          y: clientY,
          size: Math.random() * 16 + 14,
          speedX: (Math.random() - 0.5) * 4,
          speedY: (Math.random() - 0.5) * 4,
          opacity: 0.9,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 3,
          char: ['💖', '✨', '🌸', '🎀'][Math.floor(Math.random() * 4)],
        });
        if (particles.length > 55) {
          particles.shift();
        }
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
    };
  }, [rosePetalsOnly]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
}
