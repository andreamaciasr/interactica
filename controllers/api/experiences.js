const Experience = require("../../models/experience");

module.exports = {
  create,
  getAll,
  getOne,
};

async function create(req, res) {
  try {
    const experience = await Experience.create(req.body);
    res.json(experience);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function getAll(req, res) {
  try {
    const experiences = await Experience.find({});
    res.json(experiences);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function getOne(req, res) {
  try {
    console.log("req.params: ", req.params);
    const experience = await Experience.findById(req.params.experienceid); // comes from /:experienceid
    res.json(experience);
  } catch (error) {
    res.status(400).json(error);
  }
}

// async function show(req, res) {
//   try {
//     const doodle = await Doodle.findById(req.params.doodleId);
//     res.render("doodles/show.ejs", { title: "DoodleDo", doodle });
//   } catch (error) {
//     console.log(error);
//   }
// }
