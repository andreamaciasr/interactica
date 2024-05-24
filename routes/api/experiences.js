const express = require("express");
const router = express.Router();
const experiencesCtrl = require("../../controllers/api/experiences");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/", ensureLoggedIn, experiencesCtrl.create);

router.get("/", experiencesCtrl.getAll);

router.get("/get-nasa-image", experiencesCtrl.fetchNasa);

router.get("/:experienceid", experiencesCtrl.getOne);

router.post("/:experienceId/create_comment", experiencesCtrl.createComment);

module.exports = router;
