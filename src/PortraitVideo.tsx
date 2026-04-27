import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';

const PORTRAIT_DURATION = 90;
const TRANSITION_OVERLAP = 15;

type Transition = 'fade' | 'kenburns' | 'slide';

const PortraitSlide: React.FC<{
  src: string;
  transition: Transition;
  index: number;
}> = ({ src, transition }) => {
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
      ? interpolate(frame, [0, PORTRAIT_DURATION], [1, 1.15], { easing: Easing.linear })
      : 1;
  const translateY =
    transition === 'kenburns'
      ? interpolate(frame, [0, PORTRAIT_DURATION], [0, -30])
      : 0;

  const slideX =
    transition === 'slide'
      ? interpolate(
          frame,
          [0, TRANSITION_OVERLAP, PORTRAIT_DURATION - TRANSITION_OVERLAP, PORTRAIT_DURATION],
          [width * 0.3, 0, 0, -width * 0.3],
          {
            easing: Easing.out(Easing.cubic),
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }
        )
      : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#f5f1ec', opacity }}>
      <Img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: `translateX(${slideX}px) translateY(${translateY}px) scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};

export const PortraitVideo: React.FC<{ portraits: string[] }> = ({ portraits }) => {
  const transitions: Transition[] = ['fade', 'kenburns', 'slide'];

  return (
    <AbsoluteFill style={{ backgroundColor: '#f5f1ec' }}>
      {portraits.map((src, i) => (
        <Sequence
          key={src}
          from={i * (PORTRAIT_DURATION - TRANSITION_OVERLAP)}
          durationInFrames={PORTRAIT_DURATION}
        >
          <PortraitSlide src={src} transition={transitions[i % 3]} index={i} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
