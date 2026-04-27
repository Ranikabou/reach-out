# reach-out

Remotion portrait slideshow (1080x1920, 30fps) cycling fade → Ken Burns → slide transitions.

## Setup

```bash
npm install
```

## Develop

```bash
npx remotion studio          # preview at http://localhost:3000
```

## Render

```bash
npx remotion render PortraitVideo out.mp4
```

## Configure portraits

Edit the `portraits` array in `src/Root.tsx`. Remote URLs must be CORS-accessible — if they aren't, drop the images in `public/` and reference them as `/image1.jpg`.