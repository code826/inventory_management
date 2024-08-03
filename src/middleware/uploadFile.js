import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

//store my file on local , store the file at either gcp ,drive
const storageConfig = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
        let file_name = `${uuidv4()}_${file.originalname}`;
        cb(null,file_name);
    }
})
//images
 //test.jpg --> 1
 //test.jpg --> 2

const uploadFile = multer({
    storage:storageConfig
});

export default uploadFile;