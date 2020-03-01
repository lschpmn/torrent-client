
export type Action = {
  payload: any,
  type: string,
};

export type DbSchema = {
  dividerPositions: {
    [key: string]: number[],
  },
  downloadDestination: string,
  torrents:  Torrent[],
};

export type File = {
  name: string,
  selected: boolean,
  size: number,
};

export type Listener = (action: Action) => void;

export type Torrent = {
  // timestamp
  added: number,
  downloaded?: number,
  downloadSpeed?: number,
  files: File[],
  name?: string,
  magnetLink: string,
  pending: boolean,
  size?: number,
  uploaded?: number,
  uploadSpeed?: number,
};
