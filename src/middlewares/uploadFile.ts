import multer,{diskStorage} from "multer"

const storage = diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"src/uploads")
    },
    filename : (req,file,cb)=>{
        const exit = file.mimetype.split("/")[1]  // image/jpeg => ["image","jpeg"]
        const fileName = `${file.fieldname}-${Date.now()}.${exit}`
        cb(null,fileName)
    }
})

export const upload = multer({storage,limits:{fileSize:5 * 1024 * 1024}})