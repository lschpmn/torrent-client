import { Torrent } from '../../types';

export type ReducerState = {
  dividerPositions: { [key: string]: number | number[] },
  downloadDestination?: string;
  torrents: Torrent[],
};
