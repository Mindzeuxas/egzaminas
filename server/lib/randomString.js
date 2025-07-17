export function randomString(size = 10) {
  const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let str = "";

  for (let i = 0; i < size; i++) {
    str += abc[Math.floor(Math.random() * abc.length)];
  }

  return str;
}
