const multer = require('multer');

const upload = multer ({
     
    dest : './public/uploads/',
    limits : {
        fileSize : 1000000
    },
    filterFile : function(req, file, cb){
        if(!file.orginalname.match(/\.(jpg|jpeg|png|gif)$/)){
            return cb(new Error('Only image files are allowed!'), false)
        }
        cb(null, true)
    }
}) . single('document');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  

module.exports = {upload , storage};