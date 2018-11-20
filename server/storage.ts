import { readJSON, writeJSON } from 'fs-extra';

const DEFAULT_PATH = './storage-file.json';
let fileOperateQueue: Promise<any> = Promise.resolve();

async function read() {
  return await scheduleOperation(async () => await readJSON(DEFAULT_PATH));
}

async function write(newStorageFile) {
  await scheduleOperation(async () => await writeJSON(DEFAULT_PATH, newStorageFile));
}

function scheduleOperation(func: Function) {
  const filePromise = new Promise(async (resolve, reject) => {
    try {
      const result = await func();
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });

  fileOperateQueue = fileOperateQueue.then(() => filePromise);

  return filePromise;
}