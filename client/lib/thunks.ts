import { join } from 'path';


export async function addTorrent(magnetLink: string) {
  const response = await post('/add', { magnetLink });

  console.log(response);
}

export async function setup() {
  const response = await post('/setup');

  console.log(response);
}

async function post(path: string, body?: any): Promise<any> {
  const response = await fetch(`http://${join('localhost:3000', path)}`, {
    method: 'POST',
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}