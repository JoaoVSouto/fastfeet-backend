import path from 'path';

import multer, { Options } from 'multer';
import { uuid as generateUuid } from 'uuidv4';

import AppError from '@errors/AppError';

export const uploadsDir = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  dest: path.resolve(uploadsDir),

  storage: multer.diskStorage({
    destination: path.resolve(uploadsDir),
    filename(req, file, cb) {
      const [, fileExt] = file.originalname.split('.');

      const uuid = generateUuid();
      const fileName = `${uuid}.${fileExt}`;

      return cb(null, fileName);
    },
  }),

  fileFilter(req, file, cb) {
    const acceptedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (!acceptedTypes.includes(file.mimetype)) {
      cb(new AppError('File type is not allowed'));
      return;
    }

    cb(null, true);
  },
} as Options;
