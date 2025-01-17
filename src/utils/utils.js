const MODAL_OFFSET_X = -160;
const MODAL_OFFSET_Y = -172;

const formatDate = (date) => {
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}, ${day} ${year}`;
};

const calculateModalPosition = (cursorPositionX, cursorPositionY) => {
  const x = cursorPositionX + MODAL_OFFSET_X;
  const y = cursorPositionY + MODAL_OFFSET_Y;
  return { x, y };
}

export { formatDate, calculateModalPosition };
