const Users = require("../../models/Users");
const Genders = require("../../models/Genders");
const Roles = require("../../models/Roles");

const BaseControllers = require("../../utils/baseControllers");
const { Earners } = require("../../models");

class UserControllers extends BaseControllers {
    constructor() {
        super(Users, ["username", "email"], [Roles, Genders], "profileImage");
    }

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

        // Perform the update in the Users table
        await this.Model.update(req.body, {
            where: { id },
            validate: true,
            individualHooks: true,
        });

        // If firstName or lastName is updated, update the Earners table as well
        if (req.body.firstName || req.body.lastName) {
            const updatedUser = await this.Model.findByPk(id);
            const newName = `${updatedUser.firstName} ${updatedUser.lastName}`;

            // Update the related Earners record with the new name
            await Earners.update({ name: newName }, { where: { userId: id } });
        }

        // Retrieve the updated record
        const updatedRecord = await this.Model.findByPk(id, { include: this.associations });

        // Send the updated record in response
        this.sendResponse(res, 200, updatedRecord, `${this.Model.name} successfully updated`);
    });
}

const userControllers = new UserControllers();
module.exports = userControllers;
