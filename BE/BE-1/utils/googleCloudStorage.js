const { Storage } = require("@google-cloud/storage");
require("dotenv").config();

const storage = new Storage({ keyFilename: process.env.GCP_KEY_FILE });
const bucketName = process.env.GCP_BUCKET_NAME;

exports.uploadToGCS = async (fileBuffer, fileName, mimetype) => {
  const file = storage.bucket(bucketName).file(fileName);
  await file.save(fileBuffer, { metadata: { contentType: mimetype } });
  return `https://storage.googleapis.com/${bucketName}/${fileName}`;
};
