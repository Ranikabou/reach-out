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
  { src: staticFile('portrait-6.jpg'), title: 'Duo' },
  { src: staticFile('portrait-7.jpg'), title: 'Rouge' },
  { src: staticFile('portrait-8.jpg'), title: 'Silence' },
  { src: staticFile('portrait-9.jpg'), title: 'Cadeau' },
  { src: staticFile('portrait-10.jpg'), title: 'Solitude' },
];

const slidesEnd =
  portraits.length * (PORTRAIT_DURATION - TRANSITION_OVERLAP) + TRANSITION_OVERLAP;
const totalFrames = slidesEnd + END_CARD_DURATION;

const variants: { id: string; hook: string; endHeadline: string; endSubhead: string }[] = [
  {
    id: 'PortraitTransformation',
    hook: 'I turned this photo into a ceramic portrait.',
    endHeadline: 'turn someone\nyou love into\na ceramic portrait.',
    endSubhead: 'made by hand · france',
  },
  {
    id: 'PortraitPOV',
    hook: 'POV: she sees herself in ceramic.',
    endHeadline: 'made for the\npeople you love.',
    endSubhead: 'one of one · ceramic',
  },
  {
    id: 'PortraitGift',
    hook: "I didn't know what to get my mom.",
    endHeadline: 'the gift\nshe will keep\nforever.',
    endSubhead: 'order before may',
  },
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {variants.map((v) => (
        <Composition
          key={v.id}
          id={v.id}
          component={PortraitVideo}
          durationInFrames={totalFrames}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            portraits,
            hook: v.hook,
            endHeadline: v.endHeadline,
            endSubhead: v.endSubhead,
          }}
        />
      ))}
    </>
  );
};
