const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

//Configuring  MULTER TO S3 - FIRO
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("./s3");

const app = express();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "wandersnap",
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

app.post("/upload", upload.single("image"), (req, res) => {
  res.send({ imageUrl: req.file.location });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// All paths start with '/api/users'

// POST /api/users (create a user - sign up)
router.post("/", usersCtrl.create);
// POST /api/users/login
router.post("/login", usersCtrl.login);

router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;
