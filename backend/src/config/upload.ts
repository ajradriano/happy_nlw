import multer from 'multer';
import path from 'path';

function formatCurrentDate(){
    var date = new Date(),
        day  = date.getDate().toString().padStart(2, '0'),
        month  = (date.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        year  = date.getFullYear(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds()
    return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

function convertFileName(fileName: string) {
    return fileName.replace(/\s+/g, '_').toLowerCase();
}

export default {

    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'storage', 'images'),
        filename: (request, file, cb) => {
            const fileName = `${formatCurrentDate()}_${convertFileName(file.originalname)}`;
            cb( null, fileName);
        }
    })
    
}