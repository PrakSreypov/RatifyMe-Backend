class ApiFeature {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // method to filter the result exclude sort page limit and fields params
    // those params does not work with filter
    filtering() {
        const queryObj = { ...this.queryString };
        const excludeFields = ["sort", "page", "limit", "fields"];

        excludeFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => {
            switch (match) {
                case "gte":
                    return "[Op.gte]";
                case "gt":
                    return "[Op.gt]";
                case "lte":
                    return "[Op.lte]";
                case "lt":
                    return "[Op.lt]";
                default:
                    return match;
            }
        });

        this.query = {
            where: JSON.parse(queryStr),
        };

        return this;
    }

    // method sort the output 
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort
                .split(",")
                .map((el) => [el, "ASC"]);
            this.query.order = sortBy;
        } else {
            this.query.order = [["id", "DESC"]];
        }

        return this;
    }

    // method fields output
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",");
            this.query.attributes = fields;
        }

        return this;
    }

    // method pagination in offset
    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const offset = (page - 1) * limit;

        this.query.limit = limit;
        this.query.offset = offset;

        return this;
    }

    async execute(model) {
        return await model.findAll(this.query);
    }
}

module.exports = ApiFeature;
