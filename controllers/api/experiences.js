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
  deleteComment,
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

async function deleteComment(req, res) {
  try {
    console.log("working controller");
    // const experience = await Experience.findOne({
    //   "comments._id": req.params.commentId, // URL parameter
    //   "comments.user": req.user_id, // Ensure req.user_id is set correctly
    // });
    const experience = await Experience.findById(req.params.experienceId);
    if (!experience) {
      return res
        .status(404)
        .send({ message: "Experience or comment not found" });
    }

    const comment = experience.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    comment.remove();
    await experience.save();

    return res.status(200).send({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).send({ message: "Internal server error" });
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
