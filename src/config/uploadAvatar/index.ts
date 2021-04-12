import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
const uploadFolderAvatar = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  'uploads',
  'avatar',
);

export default {
  directory: uploadFolderAvatar,
  storage: multer.diskStorage({
    destination: uploadFolderAvatar,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;
      callback(null, filename);
    },
  }),
};
