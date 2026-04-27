import { Composition, staticFile } from 'remotion';
import {
  END_CARD_DURATION,
  PORTRAIT_DURATION,
  Portrait,
  PortraitVideo,
  TRANSITION_OVERLAP,
} from './PortraitVideo';

const portraits: Portrait[] = [
  { src: staticFile('portrait-1.jpg'), title: 'Tendresse' },
  { src: staticFile('portrait-2.jpg'), title: 'Reverie' },
  { src: staticFile('portrait-3.jpg'), title: 'Les Deux' },
  { src: staticFile('portrait-4.jpg'), title: 'Lumière' },
  { src: staticFile('portrait-5.jpg'), title: 'Mémoire' },
];

export const RemotionRoot: React.FC = () => {
  const slidesEnd =
    portraits.length * (PORTRAIT_DURATION - TRANSITION_OVERLAP) + TRANSITION_OVERLAP;
  const totalFrames = slidesEnd + END_CARD_DURATION;

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
