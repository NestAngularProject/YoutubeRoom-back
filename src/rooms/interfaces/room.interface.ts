import { Video } from '../../videos/interfaces/video.interface';

export interface Room {
  name: string;
  password: string;
  videos: Video[];
}
