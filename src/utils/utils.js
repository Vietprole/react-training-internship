const formatDate = (date) => {
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}, ${day} ${year}`;
};

export { formatDate };
