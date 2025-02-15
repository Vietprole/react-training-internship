const formatDate = (date) => {
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}, ${day} ${year}`;
};

const convertStringToDate = (dateString) => {
  const date = new Date(dateString);
  return date;
}

export { formatDate, convertStringToDate };
