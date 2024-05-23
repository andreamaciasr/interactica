const { findRenderedDOMComponentWithTag } = require("react-dom/test-utils");
const Experience = require("../../models/experience");
const BASE_URL = "/api/experiences";
const NASA_URL = "https://api.nasa.gov/planetary/apod?api_key=";
const KEY = process.env.NASA_KEY;

module.exports = {
  create,
  getAll,
  getOne,
  fetchNasa,
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
    const experience = await Experience.findById(req.params.experienceid); // comes from /:experienceid
    res.json(experience);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function fetchNasa(req, res) {
  console.log("running");
  try {
    const response = await fetch(NASA_URL + KEY);
    console.log(response);
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}
