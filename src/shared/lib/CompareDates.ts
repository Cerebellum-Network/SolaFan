export const isEventStarted = (eventDate: string) => {
  let currentDate = new Date();
  return new Date(eventDate) > currentDate;
};
