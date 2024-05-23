const express = require("express");
const router = express.Router();
const experiencesCtrl = require("../../controllers/api/experiences");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/", ensureLoggedIn, experiencesCtrl.create);

router.get("/", experiencesCtrl.getAll);

router.get("/:experienceid", experiencesCtrl.getOne);

router.get("/get-nasa-image", experiencesCtrl.fetchNasa);

module.exports = router;
