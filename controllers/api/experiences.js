const { findRenderedDOMComponentWithTag } = require("react-dom/test-utils");
const Experience = require("../../models/experience");
const NASA_URL = "https://api.nasa.gov/planetary/apod?api_key=";
const KEY = process.env.NASA_KEY;

module.exports = {
  create,
  getAll,
  getOne,
  fetchNasa,
  createComment,
  getAllComments,
};

async function create(req, res) {
  try {
    const experience = await Experience.create(req.body);
    res.json(experience);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function createComment(req, res) {
  try {
    const experience = await Experience.findById(req.params.experienceId);
    req.body.user = req.user;
    experience.comments.push(req.body);
    experience.save();
    res.json(req.body);
  } catch (error) {
    console.log("Error saving comment ", error);
  }
}

async function getAll(req, res) {
  try {
    const experiences = await Experience.find({})
      .populate("user")
      .populate({ path: "comments.user" })
      .populate("comments");
    res.json(experiences);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function getOne(req, res) {
  try {
    const experience = await Experience.findById(req.params.experienceid); // comes from /:experienceid
    res.json(experience);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function fetchNasa(req, res) {
  try {
    const response = await fetch(NASA_URL + KEY);

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.json(error);
  }
}

async function getAllComments(req, res) {
  try {
    const experience = await Experience.findById(req.params.experienceId)
      .populate("user")
      .populate({ path: "comments.user" });
    comments = experience.comments;
    res.json(comments);
  } catch (error) {
    console.log("fallo tu route");
  }
}
