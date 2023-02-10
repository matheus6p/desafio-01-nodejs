export async function bufferToJson(req, res) {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  // console.log(buffers.toString());
  // console.log(JSON.parse(buffers.toString()));
  // console.log(Buffer.concat(buffers));

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }
}
