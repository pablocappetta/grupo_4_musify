/* Middleware multer upload images */
const multer = require('multer');   
const path = require('path');       

const multerDiskStorage = multer.diskStorage({

    destination:(req, file, callback) => {
        let folder = path.join(__dirname, '../../public/img/'); // Multer guardará acá las fotos enviadas por el form
        callback(null, folder);
    },

    fileName: (req, file, callback) => {
        let imageName = `${Date.now()}_img${path.extname(file.originalname)}`;
        callback(null, imageName);
    } 
});

const uploadFile = multer({multerDiskStorage});

module.exports = uploadFile;