
export type Torrent = {
  // timestamp
  added: number,
  files: File[],
  name: string,
  magnetLink: string,
  pending: boolean,
  size: number,
};

export type File = {
  name: string,
  size: number,
};