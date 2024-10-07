const sharp = require("sharp");
const PDFDocument = require("pdfkit");
const AWS = require("aws-sdk");
const catchAsync = require("../../utils/catchAsync");
const fs = require("fs");
// const { Readable } = require('stream');

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION,
});

// Function to convert SVG to PDF using Sharp and PDFKit
const convertSvgToPdf = async (jpegBuffer) => {
    // Convert SVG to PNG using sharp
    const pngBuffer = await sharp(jpegBuffer)
        .png() // Adjust quality settings as needed
        .toBuffer();

    // Log PNG Buffer Size

    // Create a PDF document using pdfkit
    const doc = new PDFDocument({ layout: "landscape", size: "A4" });
    const writeStream = fs.createWriteStream("output.pdf");
    const pdfBufferChunks = [];

    // Capture data as it is generated
    doc.on("data", (chunk) => {
        pdfBufferChunks.push(chunk);
    });

    // Return a promise that resolves when the document ends
    return new Promise((resolve, reject) => {
        doc.on("end", () => {
            const finalBuffer = Buffer.concat(pdfBufferChunks);
            if (finalBuffer.length === 0) {
                reject(new Error("PDF Buffer is empty after processing"));
            } else {
                resolve(finalBuffer); // Resolve with the complete PDF buffer
            }
        });
        doc.pipe(writeStream);

        // Add the PNG image to the PDF document
        doc.image(pngBuffer, 0, 0, {
            fit: [doc.page.width, doc.page.height],
            align: "center",
            valign: "center",
        });

        // Close the PDF document
        doc.end();
        writeStream.on('finish', () => {
        });
    });
};

// Upload PDF to S3
// Function to upload the PDF to S3
const uploadToS3 = async (pdfBuffer, fileName) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME, // Your S3 bucket name
        Key: `Certificate/${fileName}.pdf`, // Uploaded PDF file name
        Body: pdfBuffer, // PDF buffer
        ContentType: "application/pdf", // Correct content type
    };

    try {
        const data = await s3.upload(params).promise();
        console.log("File uploaded to S3:", data.Location);
        return data.Location; // Return URL of uploaded PDF
    } catch (error) {
        console.error("Error uploading to S3:", error);
        throw error;
    }
};

// Endpoint to handle file upload and processing
exports.uploadCerti = catchAsync(async (req, res) => {
    try {
        const svgBuffer = req.file.buffer; // Multer provides the file buffer
        console.log("svg", svgBuffer);
        const { originalname, mimetype } = req.file;

        // Convert the uploaded SVG to PDF
        const pdfBuffer = await convertSvgToPdf(svgBuffer);
        console.log("hello buffer", pdfBuffer);

        const pdfUrl = await uploadToS3(pdfBuffer, originalname.replace(".jpeg", ""));
        console.log("Pdf Url", pdfUrl);
        res.json({
            message: "File uploaded successfully",
            pdfUrl,
        });
    } catch (error) {
        console.error("Error processing file:", error);
        res.status(500).json({ error: "Error processing file" });
    }
});
