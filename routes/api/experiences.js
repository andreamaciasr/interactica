const express = require("express");
const router = express.Router();
const experiencesCtrl = require("../../controllers/api/experiences");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/", ensureLoggedIn, experiencesCtrl.create);

router.get("/", ensureLoggedIn, experiencesCtrl.getAll);

module.exports = router;
