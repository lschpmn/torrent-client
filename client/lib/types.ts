import { Torrent } from '../../types';

export type ReducerState = {
  dividerPositions: { [key: string]: number },
  downloadDestination?: string;
  torrents: Torrent[],
};
