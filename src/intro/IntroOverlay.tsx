import { useRef } from 'react';
import './intro.css';
import { useIntro, LETTER_COLORS, LETTER_OPACITIES } from './useIntro';

const GLOW_SHADOW = '0 0 30px rgba(140, 180, 255, 0.4)';

export default function IntroOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const skipRef    = useRef<HTMLButtonElement>(null);

  useIntro({ overlayRef, canvasRef, lettersRef, skipRef });

  return (
    <div ref={overlayRef} className="intro-overlay">
      <canvas ref={canvasRef} id="intro-canvas" />

      <div className="intro-text">
        {'Octeters'.split('').map((letter, i) => (
          <span
            key={i}
            className="intro-letter"
            style={{
              color: LETTER_COLORS[i],
              textShadow: (LETTER_OPACITIES[i] ?? 0) >= 0.78 ? GLOW_SHADOW : 'none',
            }}
            ref={el => { lettersRef.current[i] = el; }}
          >
            {letter}
          </span>
        ))}
      </div>

      <button ref={skipRef} className="intro-skip">
        Skip intro →
      </button>
    </div>
  );
}
