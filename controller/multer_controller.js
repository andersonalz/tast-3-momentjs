const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req , file , cb) {
        cb(null ,path.join(__dirname , "../public/uploads")) 
    },
    filename: function (req, file , cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".jpeg")
    }
})

const fileFilter = (req , file , cb) => {
    let allowedMime = ["image/jpeg" , "image/png"]
    if(allowedMime.includes(file.mimetype)){
        cb(null , true)
    }else{
        cb(new Error("Invalid file type"), false)
    }
}

const obj = multer({
    storage : storage,
    limits : {
        fileSize : 1000000
    },
    fileFilter : fileFilter
})


const upload = multer(obj).array('image', 12)
exports.uploadImage =  (req , res , next) =>{
    upload(req, res, function(err) {
        if(err){
           res.status(500)
        if(err.code == "LIMIT_FILE_SIZE"){
          err.message = "Limit file size"  
        } 
         return res.json(err) 
        }
        next()
    })
}
