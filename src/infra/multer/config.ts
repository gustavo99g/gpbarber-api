import multer from "multer";
import { tmpFolder } from "../../config/storage";


export default {
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.'+file.mimetype.split('/')[1])
    }
   
  }),
};