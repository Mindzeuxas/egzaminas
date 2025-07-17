import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/thumbnails");
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").at(-1);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e6);
    const newFileName = "picture-" + uniqueSuffix + "." + extension;
    req.newFileName = newFileName;
    cb(null, newFileName);
  },
});

export const uploadThumbnailImage = multer({
  storage: storage,
  limits: {
    fileSize: 3000000,
  },
});
