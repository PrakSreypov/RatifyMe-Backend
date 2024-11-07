const { Sequelize, Op } = require("sequelize");

/**
 *
 * @param queryString : take operation from endpoint and apply by output
 * @class ApiFeature
 */
class ApiFeature {
    constructor(queryString, model) {
        this.query = {};
        this.queryString = queryString;
        this.model = model;
    }

    filtering() {
        const queryObj = { ...this.queryString };
        const excludedFields = ["page", "sort", "limit", "page", "search"];
        excludedFields.forEach((el) => delete queryObj[el]);
    
        const filters = {};
        Object.keys(queryObj).forEach((field) => {
            if (typeof queryObj[field] === "object") {
                for (const op in queryObj[field]) {
                    const value = queryObj[field][op];
                    if (op === "gte") filters[field] = { [Op.gte]: value };
                    else if (op === "gt") filters[field] = { [Op.gt]: value };
                    else if (op === "lte") filters[field] = { [Op.lte]: value };
                    else if (op === "lt") filters[field] = { [Op.lt]: value };
                }
            } else {
                filters[field] = queryObj[field];
            }
        });
    
        // Apply search logic only if the search query is present and fields exist in the model
        if (this.queryString.search) {
            const searchConditions = [];
            const cleanedSearch = this.queryString.search.replace(/\s+/g, "");

            if (this.model.rawAttributes.name) {
                searchConditions.push({
                    [Op.or]: [
                        Sequelize.where(
                            Sequelize.fn("replace", Sequelize.col("name"), " ", ""),
                            { [Op.like]: `%${cleanedSearch}%` }
                        )
                    ]
                });
            }

            if (this.model.rawAttributes.subscriptionName) {
                searchConditions.push({
                    [Op.or]: [
                        Sequelize.where(
                            Sequelize.fn("replace", Sequelize.col("subscriptionName"), " ", ""),
                            { [Op.like]: `%${cleanedSearch}%` }
                        )
                    ]
                });
            }
            if (this.model.rawAttributes.earnerName) {
                searchConditions.push({
                    [Op.or]: [
                        Sequelize.where(
                            Sequelize.fn("replace", Sequelize.col("earnerName"), " ", ""),
                            { [Op.like]: `%${cleanedSearch}%` }
                        )
                    ]
                });
            }
    
            if (this.model.rawAttributes.institutionName) {
                searchConditions.push({
                    [Op.or]: [
                        Sequelize.where(
                            Sequelize.fn("replace", Sequelize.col("institutionName"), " ", ""),
                            { [Op.like]: `%${cleanedSearch}%` }
                        )
                    ]
                });
            }
    
            if (this.model.rawAttributes.inviteEmail) {
                searchConditions.push({
                    [Op.or]: [
                        Sequelize.where(
                            Sequelize.fn("replace", Sequelize.col("inviteEmail"), " ", ""),
                            { [Op.like]: `%${cleanedSearch}%` }
                        )
                    ]
                });
            }
    
            if (searchConditions.length > 0) {
                filters[Op.or] = searchConditions;
            }
        }
    
        this.query.where = filters;
        return this;
    }
    

    sorting(defaultSortField = 'id') {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort
                .split(",")
                .map((el) => {
                    let field = el.startsWith("-") ? el.slice(1) : el;
                    const order = el.startsWith("-") ? "DESC" : "ASC";
    
                    // Validate if the field exists in rawAttributes of the model
                    if (this.model.rawAttributes[field]) {
                        return [field, order];
                    }
                    return null;
                })
                .filter(Boolean);
    
            // If no valid fields are provided, use the dynamic default sort field
            this.query.order = sortBy.length ? sortBy : [[defaultSortField, "DESC"]];
        } else {
            this.query.order = [[defaultSortField, "DESC"]];
        }
    
        return this;
    }

    // Field limiting logic
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",");
            this.query.attributes = fields;
        }
        return this;
    }

    // Pagination logic
    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const offset = (page - 1) * limit;

        this.query.limit = limit;
        this.query.offset = offset;

        return this;
    }

    // Execute the query and return results
    async execute(options = {}) {
        return await this.model.findAll({ ...this.query, ...options });
    }
}

module.exports = ApiFeature;
