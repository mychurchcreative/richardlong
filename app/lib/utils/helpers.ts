import dayjs from 'dayjs';

export const titleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function formatDate(date: string) {
  return dayjs(date).format('MMMM D, YYYY');
}
