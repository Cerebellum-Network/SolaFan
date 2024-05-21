export type Thumbnail = {
  id: number;
  type: string; // it has to be ENUM, but it's string on backend side.
  cdnUrl: string;
};
