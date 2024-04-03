import { resolve } from "path";

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');
const avatarFolder = resolve (__dirname, '..', '..', 'public', 'avatars');
const storageUrl = 'http://localhost:3333/public/avatars/'

export {
  tmpFolder,
  avatarFolder,
  storageUrl
};
