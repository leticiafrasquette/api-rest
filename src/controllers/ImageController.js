import multer from 'multer';
import multerConfig from '../config/multerConfig';

import Image from '../models/Image';

const upload = multer(multerConfig).single('image');

class ImageController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        const image = await Image.create({ originalname, filename, aluno_id });

        return res.json(image);
      } catch (e) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
    });
  }
}

export default new ImageController();
