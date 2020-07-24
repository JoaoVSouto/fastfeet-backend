import path from 'path';

import multer, { Options } from 'multer';
import { uuid as generateUuid } from 'uuidv4';

export const uploadsDir = path.resolve(__dirname, '..', '..', 'tmp');

export default function multerConfig(uploadFolder: string): Options {
  return {
    dest: path.resolve(uploadsDir, uploadFolder),
    storage: multer.diskStorage({
      destination: path.resolve(uploadsDir, uploadFolder),
      filename(req, file, cb) {
        const [, fileExt] = file.originalname.split('.');

        const uuid = generateUuid();
        const fileName = `${uuid}.${fileExt}`;

        return cb(null, fileName);
      },
    }),
  };
}
