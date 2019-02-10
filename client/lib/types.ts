import { Torrent } from '../../types';

export type ReducerState = {
  downloadDestination?: string;
  torrents: Torrent[],
};