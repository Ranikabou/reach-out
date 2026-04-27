import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';

export const PORTRAIT_DURATION = 45;
export const TRANSITION_OVERLAP = 10;
export const HOOK_DURATION = 60;
export const END_CARD_DURATION = 75;

const SERIF_STACK =
  '"Liberation Serif", "DejaVu Serif", "Times New Roman", Georgia, serif';
const SANS_STACK =
  '"DejaVu Sans", "Liberation Sans", "Helvetica Neue", Helvetica, Arial, sans-serif';

const BACKDROP = '#f5f1ec';
const INK = '#1a1a1a';
const MUTED = '#6b665e';
const ACCENT = '#c44a2a';

export type Portrait = { src: string; title: string };

export type PortraitVideoProps = {
  portraits: Portrait[];
  hook: string;
  endHeadline: string;
  endSubhead: string;
};

const PortraitSlide: React.FC<{
  src: string;
  index: number;
}> = ({ src, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterScale = spring({
    frame,
    fps,
    config: { damping: 18, mass: 0.6, stiffness: 140 },
    durationInFrames: 12,
  });
  const startScale = index % 2 === 0 ? 1.08 : 0.94;
  const scale = startScale + (1 - startScale) * enterScale;

  const breathe = interpolate(frame, [0, PORTRAIT_DURATION], [0, 0.025]);
  const finalScale = scale + breathe;

  const opacity = interpolate(
    frame,
    [0, 5, PORTRAIT_DURATION - TRANSITION_OVERLAP, PORTRAIT_DURATION],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: BACKDROP, opacity }}>
      <Img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: `scale(${finalScale})`,
        }}
      />
    </AbsoluteFill>
  );
};

const KineticHook: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(' ');
  const STAGGER = 4;

  const cardOpacity = interpolate(
    frame,
    [0, 6, HOOK_DURATION - 12, HOOK_DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const cardLift = interpolate(frame, [0, 18], [40, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 200,
        opacity: cardOpacity,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          transform: `translateY(${cardLift}px)`,
          padding: '44px 60px',
          background: 'rgba(245, 241, 236, 0.86)',
          borderRadius: 32,
          boxShadow: '0 14px 40px rgba(26,26,26,0.08)',
        }}
      >
        <div
          style={{
            fontFamily: SANS_STACK,
            fontSize: 22,
            letterSpacing: 12,
            color: MUTED,
            textTransform: 'uppercase',
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          loiseaubleu
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0 22px',
            maxWidth: 880,
            fontFamily: SERIF_STACK,
            fontSize: 92,
            lineHeight: 1.05,
            color: INK,
            textAlign: 'center',
          }}
        >
          {words.map((word, i) => {
            const start = i * STAGGER;
            const wordIn = spring({
              frame: frame - start,
              fps,
              config: { damping: 16, mass: 0.5, stiffness: 160 },
              durationInFrames: 14,
            });
            const wordOpacity = interpolate(frame - start, [0, 6], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  transform: `translateY(${(1 - wordIn) * 30}px) scale(${0.9 + 0.1 * wordIn})`,
                  opacity: wordOpacity,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ScarcityBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const lift = interpolate(frame, [0, 18], [-20, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: 'clamp',
  });
  const pulse = 1 + 0.03 * Math.sin((frame / 12) * Math.PI);

  return (
    <div
      style={{
        position: 'absolute',
        top: 90,
        right: 56,
        transform: `translateY(${lift}px) scale(${pulse})`,
        opacity,
        padding: '14px 24px',
        background: ACCENT,
        color: '#fff',
        fontFamily: SANS_STACK,
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: 3,
        textTransform: 'uppercase',
        borderRadius: 999,
        boxShadow: '0 8px 24px rgba(196,74,42,0.35)',
      }}
    >
      Only 25 / month
    </div>
  );
};

const TitleCaption: React.FC<{ title: string; index: number; total: number }> = ({
  title,
  index,
  total,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 6, PORTRAIT_DURATION - 8, PORTRAIT_DURATION], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lift = interpolate(frame, [0, 10], [16, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 180,
        textAlign: 'center',
        transform: `translateY(${lift}px)`,
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: SERIF_STACK,
          fontSize: 56,
          letterSpacing: 6,
          color: INK,
          textTransform: 'uppercase',
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 10,
          fontFamily: SANS_STACK,
          fontSize: 24,
          letterSpacing: 10,
          color: MUTED,
        }}
      >
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </div>
  );
};

const Watermark: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      bottom: 70,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontFamily: SANS_STACK,
      fontSize: 24,
      letterSpacing: 10,
      color: MUTED,
      textTransform: 'uppercase',
    }}
  >
    portrait.loiseaubleu.fun
  </div>
);

const EndCard: React.FC<{ headline: string; subhead: string }> = ({ headline, subhead }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const popIn = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.6, stiffness: 130 },
    durationInFrames: 18,
  });
  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(
    frame,
    [END_CARD_DURATION - 8, END_CARD_DURATION],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BACKDROP,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${0.9 + 0.1 * popIn})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 26,
        }}
      >
        <div
          style={{
            fontFamily: SANS_STACK,
            fontSize: 22,
            letterSpacing: 12,
            color: MUTED,
            textTransform: 'uppercase',
          }}
        >
          {subhead}
        </div>
        <div
          style={{
            fontFamily: SERIF_STACK,
            fontSize: 110,
            lineHeight: 1.0,
            color: INK,
            textAlign: 'center',
            maxWidth: 920,
            whiteSpace: 'pre-line',
          }}
        >
          {headline}
        </div>
        <div
          style={{
            marginTop: 24,
            padding: '22px 52px',
            background: INK,
            color: BACKDROP,
            borderRadius: 999,
            fontFamily: SANS_STACK,
            fontSize: 30,
            letterSpacing: 4,
            fontWeight: 600,
          }}
        >
          portrait.loiseaubleu.fun  →
        </div>
        <div
          style={{
            marginTop: 12,
            fontFamily: SANS_STACK,
            fontSize: 20,
            letterSpacing: 8,
            color: ACCENT,
            textTransform: 'uppercase',
          }}
        >
          Only 25 portraits this month
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const PortraitVideo: React.FC<PortraitVideoProps> = ({
  portraits,
  hook,
  endHeadline,
  endSubhead,
}) => {
  const slidesEnd =
    portraits.length * (PORTRAIT_DURATION - TRANSITION_OVERLAP) + TRANSITION_OVERLAP;

  return (
    <AbsoluteFill style={{ backgroundColor: BACKDROP }}>
      {portraits.map((p, i) => (
        <Sequence
          key={p.src}
          from={i * (PORTRAIT_DURATION - TRANSITION_OVERLAP)}
          durationInFrames={PORTRAIT_DURATION}
          name={`Slide ${i + 1}`}
        >
          <PortraitSlide src={p.src} index={i} />
          <TitleCaption title={p.title} index={i} total={portraits.length} />
        </Sequence>
      ))}

      <Sequence from={0} durationInFrames={slidesEnd}>
        <Watermark />
      </Sequence>

      <Sequence from={HOOK_DURATION} durationInFrames={slidesEnd - HOOK_DURATION}>
        <ScarcityBadge />
      </Sequence>

      <Sequence from={0} durationInFrames={HOOK_DURATION}>
        <KineticHook text={hook} />
      </Sequence>

      <Sequence from={slidesEnd} durationInFrames={END_CARD_DURATION}>
        <EndCard headline={endHeadline} subhead={endSubhead} />
      </Sequence>
    </AbsoluteFill>
  );
};
