import { unlink } from 'fs';
import { promisify } from 'util';

export default async function deleteFile(path: string): Promise<void> {
  await promisify(unlink)(path);
}
