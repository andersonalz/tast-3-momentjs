var express = require("express");
var router = express.Router();
const multer = require("multer");
const { uploadImage } = require("../controller/multer_controller");
const mongoose = require("mongoose");
const File = require("../models/file_models");
const MultiFile = require("../models/multifiles_model");
const Time = require("../models/timeFile_model");
const User = require("../models/user");
const fs = require("fs");
var moment = require("moment");
const { createTimeFile , createUser} = require("../controller/createTimeFile");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const downloadFile = await File.find({});
    res.render("upload", { downloadFile: downloadFile });
  } catch (error) {
    console.log(error);
  }
});

// router.get('/download/:pathFile', async function (req, res, next) {
//   const downloadFile = await File.find({path : req.params.pathFile})
//   res.send(200)
// })

router.post("/upload", uploadImage, (req, res) => {
  if (!req.file) {
    return res.status(404).send("file require");
  }
  // console.log(req.body.indorsement)
  File.find({ indorsement: req.body.indorsement }, function (err, docs) {
    if (err) return console.error(err);
    console.log(docs);
    if (docs) {
      findPathFile = docs.map(function (doc) {
        File.deleteOne({ indorsement: doc.indorsement }, function (err, docs) {
          if (err) {
            return console.log(err);
          }
          if (fs.existsSync(doc.path)) {
            fs.unlink(doc.path, (err) => {
              if (err) {
                console.log(err);
              }
            });
          }
        });
      });
    }
  });
const file = new File({
        name: req.file.originalname,
        path: req.file.path,
        type: req.file.mimetype,
        size: req.file.size,
        indorsement: req.body.indorsement,
      });

      file.save();
      
  res.status(200).send({
    message: "Upload",
    res: req.file,
  });
});



router.post('/multiUpdate' , uploadImage ,async (req, res)=>{
  try {
    MultiFile.findOne({"files.indorsement": req.body.indorsement}, function (err, docs) {
      if (err) return console.error(err);
      // console.log(JSON.stringify(docs, null, 4))
      // console.log(docs)
      if (docs) {
        findPathFile = docs.files.map(function (doc) {
          // console.log(doc.path);
          // console.log(docs._id);
          // for (let i = 0; i < docs.files.length; i++) {
             if (fs.existsSync(doc.path)) {
              fs.unlink(doc.path, (err) => {
                if (err) {
                  console.log(err);
                }
                // console.log(doc.path);
              });
            }
          // }
        MultiFile.deleteOne({_id: docs._id}, function (err, docs) { 
            console.log(docs)
            if (err) {
              return console.log(err);
            }
          });
        });
      }
    });
    let filesArray = []
    req.files.forEach(ele => {
      const file = {
        name: ele.originalname,
        path: ele.path,
        type: ele.mimetype,
        size: ele.size,
        indorsement: req.body.indorsement,
      }
      filesArray.push(file)
    });
    const MultiFiles= new MultiFile({
      name : req.body.name,
      files : filesArray
    })

    MultiFiles.save().then(savedDoc => {
      savedDoc === MultiFiles; // true
    });
    res.status(200).send({
    file: filesArray,
    message : "files uploaded..."
  })
  } catch (error) {
    console.log(error)
  }
})

router.get("/expire", async function (req, res) {
  // const FindFile = await File.find({})
  // const date = FindFile[0].createdAt
  // const JustDate = date.slice(0, 10)
  // const slitDate = JustDate.split('-')
  // console.log(slitDate)

  const indorsementIdInterface = await Time.create({
    name: req.body.name,
  });
});
/////////////////////////////////////////////////////////timeFile_model//////////////////////////////////////////////////////////////////////////
router.post('/createTimeFile', createTimeFile)
//////////////////////////////////////////////////////////////////////////////////////////create User////////////////////////////////////////////
router.post("/createUser", createUser );
/////////////////////////////////////////////////////////////////////////////////expireTime//////////////////////////////////////////////////////
router.get("/ExpirationOfUserCertificate/:id", async function (req, res) {
  try {
    const findFile = await File.findOne({ indorsement: req.params.id });
    const findTime = await Time.findOne({ name: findFile.indorsement });
    findTime.foreach(ele , ()=>{
      console.log(ele);
      if(indorsement){
        
      }
    })
    // console.log(findTime)
    if (findTime.date === "Day") {
      
      let day = moment().add(10, "days").calendar();
      let obj = {
        indorsement: findFile._id,
        indorsementIdInterface: findTime._id,
        expire: day,
      };
      const findUser = await User.findOne();
      findUser.indorsement.push(obj);
      findUser.save();
    } else {
      let obj = {
        indorsement: findFile._id,
        indorsementIdInterface: findTime._id,
        expire: moment().add(10, "month").calendar(),
      };
      const findUser = await User.findOne();
      findUser.indorsement.push(obj);
      findUser.save();
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});
  

router.get("/ExpirationOfUserCertificate", async function (req, res) {
  try {
    const findFile = await File.findOne({ indorsement: req.params.id });
    const findTime = await Time.findOne({ name: findFile.indorsement });
    if (findTime.date === "Day") {
      let day = moment().add(10, "days").calendar();
      let obj = {
        indorsement: findFile._id,
        indorsementIdInterface: findTime._id,
        expire: day,
      };
      const findUser = await User.findOne();
      findUser.indorsement.push(obj);
      findUser.save();
    } else {
      let obj = {
        indorsement: findFile._id,
        indorsementIdInterface: findTime._id,
        expire: moment().add(10, "month").calendar(),
      };
      const findUser = await User.findOne();
      findUser.indorsement.push(obj);
      findUser.save();
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
