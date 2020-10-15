import multer from 'multer';
import path from 'path';

function formatCurrentDate(){
    var date = new Date(),
        day  = date.getDate().toString().padStart(2, '0'),
        month  = (date.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        year  = date.getFullYear();
    return `${year}-${month}-${day}`;
}

export default {

    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'storage', 'images'),
        filename: (request, file, cb) => {
            const fileName = `${formatCurrentDate()}_${file.originalname}`;
            cb( null, fileName);
        }
    })
}