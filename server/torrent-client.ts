import * as WebTorrent from 'webtorrent';

let client: WebTorrent.Instance;

export function setup() {
  if (!client) client = new WebTorrent();
}

export function add(magnetLink: string) {

}