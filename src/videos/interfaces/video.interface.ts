import {Document} from 'mongoose';

export interface Video extends Document{
  id: string;
  link: string;
  timestamp: number;
  seen: boolean;
  room: string;
}
