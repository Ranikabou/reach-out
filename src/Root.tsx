import { Composition, staticFile } from 'remotion';
import { PortraitVideo } from './PortraitVideo';

const portraits = [
  staticFile('portrait-1.jpg'),
  staticFile('portrait-2.jpg'),
  staticFile('portrait-3.jpg'),
  staticFile('portrait-4.jpg'),
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
