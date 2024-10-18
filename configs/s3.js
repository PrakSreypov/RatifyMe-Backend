const AWS = require('aws-sdk')

// Configure AWS S3 (same as in the add controller)
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION,
});
module.exports= s3