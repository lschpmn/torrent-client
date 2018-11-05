const {ipcRenderer} = require('electron');
import { join } from 'path';


export async function addTorrent(magnetLink: string) {
  const response = await post('/add', { magnetLink });

  console.log(response);
}

async function post(path: string, body?: any): Promise<any> {
  ipcRenderer.send('add', body);
}