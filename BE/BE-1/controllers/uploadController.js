const { Storage } = require("@google-cloud/storage");
require("dotenv").config();

const storage = new Storage({ keyFilename: process.env.GCP_KEY_FILE });
const bucketName = process.env.GCP_BUCKET_NAME;

exports.uploadFile = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded." });
  if (req.file.mimetype !== "application/pdf")
    return res.status(400).json({ error: "Only PDF files are allowed." });

  const fileName = `uploads/${Date.now()}-${req.file.originalname.replace(
    /\s+/g,
    "_"
  )}`;
  const file = storage.bucket(bucketName).file(fileName);

  await file.save(req.file.buffer, {
    metadata: { contentType: req.file.mimetype },
  });

  const fileUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
  res.status(200).json({ message: "File uploaded successfully", fileUrl });
};
