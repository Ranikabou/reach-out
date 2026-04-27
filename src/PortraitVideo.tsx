import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';

export const PORTRAIT_DURATION = 90;
export const TRANSITION_OVERLAP = 15;
export const END_CARD_DURATION = 75;

const SERIF_STACK =
  '"Liberation Serif", "DejaVu Serif", "Times New Roman", Georgia, serif';
const SANS_STACK =
  '"DejaVu Sans", "Liberation Sans", "Helvetica Neue", Helvetica, Arial, sans-serif';

const BACKDROP = '#f5f1ec';
const INK = '#1a1a1a';
const MUTED = '#6b665e';

export type Portrait = { src: string; title: string };

type Transition = 'fade' | 'kenburns' | 'slide';

const PortraitSlide: React.FC<{
  src: string;
  title: string;
  transition: Transition;
  index: number;
  total: number;
}> = ({ src, title, transition, index, total }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, TRANSITION_OVERLAP, PORTRAIT_DURATION - TRANSITION_OVERLAP, PORTRAIT_DURATION],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  const scale =
    transition === 'kenburns'
      ? interpolate(frame, [0, PORTRAIT_DURATION], [1, 1.12], { easing: Easing.linear })
      : 1;
  const translateY =
    transition === 'kenburns'
      ? interpolate(frame, [0, PORTRAIT_DURATION], [0, -24])
      : 0;

  const slideX =
    transition === 'slide'
      ? interpolate(
          frame,
          [0, TRANSITION_OVERLAP, PORTRAIT_DURATION - TRANSITION_OVERLAP, PORTRAIT_DURATION],
          [width * 0.25, 0, 0, -width * 0.25],
          {
            easing: Easing.out(Easing.cubic),
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }
        )
      : 0;

  const labelOpacity = interpolate(
    frame,
    [TRANSITION_OVERLAP, TRANSITION_OVERLAP + 12, PORTRAIT_DURATION - TRANSITION_OVERLAP, PORTRAIT_DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: BACKDROP, opacity }}>
      <Img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: `translateX(${slideX}px) translateY(${translateY}px) scale(${scale})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 140,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: labelOpacity,
        }}
      >
        <div
          style={{
            fontFamily: SERIF_STACK,
            fontSize: 44,
            color: INK,
            letterSpacing: 6,
            textTransform: 'uppercase',
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 12,
            fontFamily: SANS_STACK,
            fontSize: 22,
            color: MUTED,
            letterSpacing: 8,
          }}
        >
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const HookOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const HOOK_FRAMES = 60;
  if (frame > HOOK_FRAMES) return null;

  const opacity = interpolate(
    frame,
    [0, 8, HOOK_FRAMES - 12, HOOK_FRAMES],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const lift = interpolate(frame, [0, HOOK_FRAMES], [40, 0], {
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 220,
        opacity,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          transform: `translateY(${lift}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          padding: '40px 64px',
          background: 'rgba(245, 241, 236, 0.78)',
          borderRadius: 28,
          backdropFilter: 'blur(6px)',
        }}
      >
        <div
          style={{
            fontFamily: SANS_STACK,
            fontSize: 24,
            letterSpacing: 10,
            color: MUTED,
            textTransform: 'uppercase',
          }}
        >
          loiseaubleu
        </div>
        <div
          style={{
            fontFamily: SERIF_STACK,
            fontSize: 88,
            lineHeight: 1.05,
            color: INK,
            textAlign: 'center',
            fontWeight: 400,
            maxWidth: 880,
          }}
        >
          I turned this photo into
          <br />a ceramic portrait.
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Watermark: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      bottom: 56,
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

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 14, END_CARD_DURATION - 8, END_CARD_DURATION], [0, 1, 1, 1], {
    extrapolateRight: 'clamp',
  });
  const lift = interpolate(frame, [0, 30], [24, 0], { easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BACKDROP,
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      <div
        style={{
          transform: `translateY(${lift}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
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
          turn someone you love into
        </div>
        <div
          style={{
            fontFamily: SERIF_STACK,
            fontSize: 110,
            lineHeight: 1.0,
            color: INK,
            textAlign: 'center',
          }}
        >
          a ceramic
          <br />
          portrait.
        </div>
        <div
          style={{
            marginTop: 24,
            padding: '20px 48px',
            border: `2px solid ${INK}`,
            borderRadius: 999,
            fontFamily: SANS_STACK,
            fontSize: 30,
            letterSpacing: 4,
            color: INK,
          }}
        >
          portrait.loiseaubleu.fun  →
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const PortraitVideo: React.FC<{ portraits: Portrait[] }> = ({ portraits }) => {
  const transitions: Transition[] = ['fade', 'kenburns', 'slide'];
  const slidesEnd = portraits.length * (PORTRAIT_DURATION - TRANSITION_OVERLAP) + TRANSITION_OVERLAP;

  return (
    <AbsoluteFill style={{ backgroundColor: BACKDROP }}>
      <Audio src={staticFile('music.mp3')} volume={0.55} />

      {portraits.map((p, i) => (
        <Sequence
          key={p.src}
          from={i * (PORTRAIT_DURATION - TRANSITION_OVERLAP)}
          durationInFrames={PORTRAIT_DURATION}
        >
          <PortraitSlide
            src={p.src}
            title={p.title}
            transition={transitions[i % 3]}
            index={i}
            total={portraits.length}
          />
        </Sequence>
      ))}

      <Sequence from={0} durationInFrames={slidesEnd}>
        <Watermark />
      </Sequence>

      <Sequence from={0} durationInFrames={60}>
        <HookOverlay />
      </Sequence>

      <Sequence from={slidesEnd} durationInFrames={END_CARD_DURATION}>
        <EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
