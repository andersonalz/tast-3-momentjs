const Time = require("../models/timeFile_model")
const User = require("../models/user");
exports.createTimeFile = async (req, res , next)=> {
    try {
      const indorsementIdInterface = await Time.create({
        name: req.body.name,
        date: req.body.date
      })
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
    }
  }

exports.createUser = async (req, res , next)=> {
  try {
    const createUser = await User.create({
      name: req.body.name,
      lname: req.body.date,
      age: req.body.age,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
}
