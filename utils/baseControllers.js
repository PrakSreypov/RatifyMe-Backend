// Utils module
const AppError = require("./appError");
const catchAsync = require("./catchAsync");

/**
 *
 * @class BaseController : Crud default controller
 * @param Model : model name
 */
class BaseController {
    constructor(Model) {
        this.Model = Model;
    }

    // Fetch all records
    getAll = catchAsync(async (req, res, next) => {
        const records = await this.Model.findAll();
        res.status(200).json({
            status: "success",
            data: records,
        });
    });

    // Create a new record
    create = catchAsync(async (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            return next(new AppError("You can't create with empty field", 400));
        }

        const newRecord = await this.Model.create(req.body);
        res.status(201).json({
            status: "success",
            data: newRecord,
        });
    });

    // Fetch a single record by ID
    getOne = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const record = await this.Model.findByPk(id);

        if (!record) {
            return next(new AppError("No record found with this ID", 404));
        }

        res.status(200).json({
            status: "success",
            data: record,
        });
    });

    // Update a record by ID
    update = catchAsync(async (req, res, next) => {
        const { id } = req.params;

        const record = await this.Model.findByPk(id);
        if (!record) {
            return next(new AppError("No record found with this ID", 404));
        }

        if (Object.keys(req.body).length === 0) {
            return next(new AppError("Nothing to update. Provide valid data.", 400));
        }

        // update the record
        await this.Model.update(req.body, {
            where: { id },
            validate: true,
            individualHooks: true,
        });
        // store the new record
        const updatedRecord = await this.Model.findByPk(id);

        res.status(200).json({
            status: "success",
            data: updatedRecord,
        });
    });

    // Delete a record by ID
    delete = catchAsync(async (req, res, next) => {
        const { id } = req.params;

        const record = await this.Model.findByPk(id);
        if (!record) {
            return next(new AppError("No record found with this ID", 404));
        }

        await this.Model.destroy({ where: { id } });
        res.status(204).json({
            status: "success",
            data: null,
        });
    });
}

module.exports = BaseController;
