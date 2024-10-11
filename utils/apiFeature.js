const { Op } = require("sequelize");


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

    // Filtering logic
    filtering() {
        const queryObj = { ...this.queryString };
        const excludedFields = ["page", "sort", "limit", "page", "search"];
        excludedFields.forEach((el) => delete queryObj[el]);

        const filters = {};
        Object.keys(queryObj).forEach((page) => {
            if (typeof queryObj[page] === "object") {
                for (const op in queryObj[page]) {
                    const value = queryObj[page][op];
                    if (op === "gte") filters[page] = { [Op.gte]: value };
                    else if (op === "gt") filters[page] = { [Op.gt]: value };
                    else if (op === "lte") filters[page] = { [Op.lte]: value };
                    else if (op === "lt") filters[page] = { [Op.lt]: value };
                }
            } else {
                filters[field] = queryObj[field];
            }
        });

        // Apply search logic if search query is present
        if (this.queryString.search) {
            filters[Op.or] = [
                { id: { [Op.like]: `%${this.queryString.search}%` } },
                { name: { [Op.like]: `%${this.queryString.search}%` } },
            ];
        }
        this.query.where = filters;
        return this;
    }

    // Sorting logic
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").map((el) => {
                let field = el;
                let order = "ASC";
                if (el.startsWith("-")) {
                    field = el.slice(1);
                    order = "DESC";
                }
                return [field, order];
            });
            this.query.order = sortBy;
        } else {
            this.query.order = [["name", "ASC"]];
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
