// Written by the avatar inside the canvas every frame and read by the DOM skill
// callouts, which live in a separate React root and can't share state through context.
// Points are viewport pixel coordinates.
export const skillAnchors = {
  visible: false,
  points: {},
};
