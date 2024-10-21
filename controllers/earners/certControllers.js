const sharp = require("sharp");
const PDFDocument = require("pdfkit");

const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const s3 = require("../../configs/s3")

const EarnerAchievements = require("../../models/EarnerAchievements");

// Function to convert SVG to PDF using Sharp and PDFKit
const convertSvgToPdf = async (jpegBuffer) => {
    // Convert SVG to PNG using sharp
    const pngBuffer = await sharp(jpegBuffer).png().toBuffer();

    // Create a PDF document using pdfkit
    const doc = new PDFDocument({ layout: "landscape", size: "A4" });
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
                // Resolve with the complete PDF buffer
                resolve(finalBuffer);
            }
        });

        // Add the PNG image to the PDF document
        doc.image(pngBuffer, 0, 0, {
            fit: [doc.page.width, doc.page.height],
            align: "center",
            valign: "center",
        });

        // Close the PDF document
        doc.end();
    });
};

// Upload PDF to S3
const uploadToS3 = async (pdfBuffer, fileName) => {
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `Certificate/${fileName}.pdf`,
        Body: pdfBuffer,
        ContentType: "application/pdf",
    };

    try {
        const data = await s3.upload(uploadParams).promise();
        return data.Location;
    } catch (error) {
        console.error("Error uploading to S3:", error);
        throw error;
    }
};

// Endpoint to handle file upload and processing
exports.uploadCerti = catchAsync(async (req, res, next) => {
    // Start upload certificate
    const { buffer: jpegBuffer, originalname } = req.file;

    if (!jpegBuffer) {
        return next(new AppError("There is no buffer provided", 400));
    }
    // Convert the uploaded SVG to PDF
    const pdfBuffer = await convertSvgToPdf(jpegBuffer);

    if (pdfBuffer.length === 0) {
        return next(new AppError("Failed to convert into pdf buffer", 405));
    }
    // Upload image to S3
    const pdfUrl = await uploadToS3(pdfBuffer, originalname.replace(".jpeg", ""));
    const jpegUrl = await uploadToS3(jpegBuffer, originalname)
    if (!pdfUrl && !jpegUrl) {
        return next(new AppError("Upload failed", 405));
    }
    // End upload certificate

    // Start add pdf to EarnerAchievements
    const { achievementId, earnerId } = req.params;
    const earnerAchieve = await EarnerAchievements.findOne({ where: { achievementId, earnerId }})
    if (!earnerAchieve){
        return next(new AppError("There's no earner achievement to update", 400))
    }
    earnerAchieve.update({
        certUrlPdf: pdfUrl,
        certUrlJpeg: jpegUrl
    })
    earnerAchieve.save()

    res.status(200).json({
        message: "File uploaded successfully",
        uploadCert : earnerAchieve.certUrlPdf,
    });
});
