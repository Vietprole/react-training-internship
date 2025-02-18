const MODAL_OFFSET_X = -160;
const MODAL_OFFSET_Y = -172;

const calculateModalPosition = (cursorPositionX, cursorPositionY) => {
  const x = cursorPositionX + MODAL_OFFSET_X;
  const y = cursorPositionY + MODAL_OFFSET_Y;
  return { x, y };
}

export { calculateModalPosition };
