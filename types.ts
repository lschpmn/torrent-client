
export type Action = {
  payload: any,
  type: string,
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
  files: File[],
  name: string,
  magnetLink: string,
  pending: boolean,
  size: number,
};
