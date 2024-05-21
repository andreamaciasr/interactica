const Experience = require("../../models/experience");

module.exports = {
  create,
  getAll,
};

async function create(req, res) {
  try {
    const experience = await Experience.create(req.body);
    console.log(experience);
    res.json(experience);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function getAll(req, res) {
  try {
    const experiences = await Experience.find({});
    res.json(notes);
  } catch (error) {
    res.status(400).json(error);
  }
}
