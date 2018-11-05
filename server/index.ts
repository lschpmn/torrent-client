import { ipcMain as main } from 'electron';

// TODO: Replace this with websocket
main.on('add', (magnetLink: string) => {
  console.log(magnetLink);
});