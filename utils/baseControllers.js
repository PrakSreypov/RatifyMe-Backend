// Utils module
const { Op } = require("sequelize");
const AppError = require("./appError");
const catchAsync = require("./catchAsync");
const ApiFeatures = require("./apiFeature");

/**
 * @class BaseController : CRUD default controller
 * @param {Object} Model - Sequelize model
 * @param {Array} [uniqueFields=[]] - Array of unique fields to check for uniqueness
 * @param {Array} [associations=[]] - Array of associated models to include in queries
 */
class BaseController {
    constructor(Model, uniqueFields = [], associations = []) {
        this.Model = Model;
        this.uniqueFields = Array.isArray(uniqueFields) ? uniqueFields : [];
        this.associations = associations;
    }

    // ============ Start Utility Method ============
    // Start Send response helper method
    sendResponse(res, statusCode, data, message) {
        res.status(statusCode).json({
            status: "success",
            message,
            data,
        });
    }
    // End Send response helper method

    // Start Check for existing unique fields
    async checkUniqueFields(data, excludeId = null) {
        const conflictingFields = [];

        for (const field of this.uniqueFields) {
            if (data[field]) {
                // Build query for each field
                const query = { [field]: data[field] };
                if (excludeId) {
                    query.id = { [Op.ne]: excludeId };
                }

                // Check if a record exists with this field value
                const existingRecord = await this.Model.findOne({ where: query });
                if (existingRecord) {
                    conflictingFields.push(field);
                }
            }
        }

        if (conflictingFields.length > 0) {
            // Construct a detailed error message
            const fieldsString = conflictingFields.join(", ");
            throw new AppError(`A record with this ${fieldsString} already exists`, 409);
        }
    }
    // End Check for existing unique fields

    // Start Check if a record exists by ID
    async checkRecordExists(id) {
        const record = await this.Model.findByPk(id, { include: this.associations });
        if (!record) {
            throw new AppError("No record found with this ID", 404); // This error only applies to valid routes with missing records
        }
        return record;
    }
    // Start Check if a record exists by ID
    // ============ End Utility Method ============

    // ============ Start CRUD Method  ============

    // Start Fetch all records (with ApiFeatures applied)
    getAllWithApiFeatures = async (req) => {
        // Initialize ApiFeatures with the model and query parameters
        const apiFeature = new ApiFeatures(this.Model, req.query, this.Model)
            .filtering() // Apply filtering
            .sorting() // Apply sorting
            .limitFields() // Apply field limiting
            .pagination(); // Apply pagination

        // Execute the query with associated models included
        const records = await apiFeature.execute({
            include: this.associations,
        });

        return records; // Return the data to be handled by the derived class
    };

    // Default getAll method that can be overridden
    getAll = catchAsync(async (req, res, next) => {
        const records = await this.getAllWithApiFeatures(req);

        res.status(200).json({
            status: "success",
            results: records.length,
            data: records,
        });
    });
    // End Fetch all records

    // Start Create a new record
    createOne = catchAsync(async (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            return next(new AppError("You can't create with empty field", 400));
        }

        // Check for existing fields
        await this.checkUniqueFields(req.body);

        const newRecord = await this.Model.create(req.body);

        // Use the default sendResponse method
        this.sendResponse(res, 201, newRecord, `${this.Model.name} successfully created`);

        // Return newRecord so child controllers can use it
        return newRecord;
    });
    // End Create a new record

    // Start Fetch a single record by ID
    getOne = catchAsync(async (req, res, next) => {
        const record = await this.checkRecordExists(req.params.id);

        this.sendResponse(res, 200, record, `${this.Model.name} found`);
    });
    // End Fetch a single record by ID

    // Start Update a record by ID
    updateOne = catchAsync(async (req, res, next) => {
        const { id } = req.params;

        // Check if record exists
        const record = await this.checkRecordExists(id);

        if (!req.body || Object.keys(req.body).length === 0) {
            return next(new AppError("Nothing to update. Provide valid data.", 400));
        }

        // Check if the new data is different from the current data
        const isDataIdentical = Object.keys(req.body).every(
            (field) => req.body[field] === record[field],
        );

        if (isDataIdentical) {
            return next(new AppError("No new changes detected!", 400));
        }

        // Check for existing fields during update
        await this.checkUniqueFields(req.body, id);

        await this.Model.update(req.body, {
            where: { id },
            validate: true,
            individualHooks: true,
        });

        // Retrieve the updated record
        const updatedRecord = await this.Model.findByPk(id, { include: this.associations });

        this.sendResponse(res, 200, updatedRecord, `${this.Model.name} successfully updated`);
    });
    // End Update a record by ID

    // Start Delete a record by ID
    deleteOne = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        await this.checkRecordExists(id);

        await this.Model.destroy({
            where: { id },
        });
        this.sendResponse(res, 200, null, `${this.Model.name} successfully deleted`);
    });
    // End Delete a record by ID

    // Start Delete all records
    deleteAll = catchAsync(async (req, res, next) => {
        await this.Model.destroy({
            where: {}, // No conditions, so this will delete all records
            truncate: false, // Optional: Also reset auto-increment counter if needed
        });
        this.sendResponse(res, 200, null, "All Records successfully deleted.");
    });
    // End Delete all records

    // ============ End CRUD Method  ============
}

module.exports = BaseController;
