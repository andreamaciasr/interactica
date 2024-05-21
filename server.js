const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
require("dotenv").config();
require("./config/database");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const s3 = require('./config/s3');

const upload = multer({
  storage: multer.memoryStorage(),
});

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));
app.use(require("./config/checkToken"));

const port = process.env.PORT || 3001;

app.use("/api/users", require("./routes/api/users"));
app.use("/api/experiences", require("./routes/api/experiences"));

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: Date.now().toString() + "-" + req.file.originalname,
      Body: req.file.buffer,
    };

    const upload = new Upload({
      client: s3,
      params: params,
    });

    const data = await upload.done();
    res.send({ imageUrl: data.Location });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send({ error: "Error uploading file" });
  }
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
