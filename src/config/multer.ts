import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../public/uploads/payments/");

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now()}_${file.originalname}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
});

export default upload;
