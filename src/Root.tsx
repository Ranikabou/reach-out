import { Composition } from 'remotion';
import { PortraitVideo } from './PortraitVideo';

const portraits = [
  'https://portraits.loiseaubleu.fun/image1.jpg',
  'https://portraits.loiseaubleu.fun/image2.jpg',
];

const PORTRAIT_DURATION = 90;
const TRANSITION_OVERLAP = 15;

export const RemotionRoot: React.FC = () => {
  const totalFrames =
    portraits.length * (PORTRAIT_DURATION - TRANSITION_OVERLAP) + TRANSITION_OVERLAP;

  return (
    <Composition
      id="PortraitVideo"
      component={PortraitVideo}
      durationInFrames={totalFrames}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ portraits }}
    />
  );
};
