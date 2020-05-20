
export interface Event {
  id: number;
  description: string;
  dateTime: string;
  title: string;
  speaker: string;
  image: string;
  detailUrl?: string;
  isMvp?: boolean;
}
