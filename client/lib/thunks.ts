

export async function addTorrent(magnetLink: string) {
  const response = await fetch('http://localhost:3000/add', {
    method: 'POST',
    body: JSON.stringify({
      magnetLink,
    }),
    headers: {
      "Content-Type": "application/json"
    },
  });

  console.log(response);
}