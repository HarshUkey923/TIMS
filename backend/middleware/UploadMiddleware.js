import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(path.dirname(), '../uploads/'));
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|png|jpg|jpeg/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (ext) {
        cb( null, true);
    } else{
        cb(new Error("File type not supported"));
    }
};

const upload = multer({
    storage,
    fileFilter
});

export default upload;