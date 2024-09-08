const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Users = sequelize.define(
    "Users",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Please tell us your first name!",
                },
                isAlpha: {
                    msg: "First name must contain only letters.",
                },
                len: {
                    args: [2, 30],
                    msg: "First name must be between 2 and 30 characters long.",    
                },
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Please tell us your last name!",
                },
                isAlpha: {
                    msg: "Last name must contain only letters.",
                },
                len: {
                    args: [2, 30],
                    msg: "Last name must be between 2 and 30 characters long.",
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "Please provide a valid email",
                },
                notNull: {
                    msg: "Email is required!",
                },
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "User is required!",
                },
                notEmpty: {
                    msg: "User connot be empty",
                },
                len: {
                    args: [3, 30],
                    msg: "Username must be between 3 and 30 characters long.",
                },
                isAlphanumeric: {
                    msg: "Username can only contain letters and numbers.",
                },
                noSpaces(value) {
                    if (/\s/.test(value)) {
                        throw new Error("Username cannot contain spaces.");
                    }
                },
            },
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Phone Number is required!",
                },
                isNumeric: {
                    msg: "Phone number must contain only numbers.",
                },
                len: {
                    args: [10, 20],
                    msg: "Phone number must be between 10 and 15 digits long.",
                },
            },
        },
        nationality: {
            type: DataTypes.STRING,
            validate: {
                isAlpha: {
                    msg: "Nationality must contain only letters.",
                },
                len: {
                    args: [2, 50],
                    msg: "Nationality must be between 2 and 50 charaters long.",
                },
            },
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: {
                    msg: "Please provide a valide date of birth.",
                },
                isBefore: {
                    args: [new Date().toISOString().split("T")[0]],
                    msg: "Date of birth must be in the past.",
                },
            },
        },
        genderId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Genders",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Roles",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        profileImage: {
            type: DataTypes.STRING,
        },
        bio: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 500],
                    msg: "Bio must be 500 characters or less.",
                },
            },
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8, 20],
                    msg: "Password must be between 8 and 20 characters",
                },
                isStrongPassword(value) {
                    if (
                        !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}/.test(
                            value,
                        )
                    ) {
                        throw new Error(
                            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                        );
                    }
                },
            },
        },
        passwordConfirm: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                validateMatchPassword(value) {
                    if (this.password !== value) {
                        throw new Error("Passwords do not match");
                    }
                },
            },
        },
        passwordChangedAt: DataTypes.DATE,
        passwordResetToken: DataTypes.STRING,
        passwordResetExpires: DataTypes.DATE,
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["email", "username"],
            },
        ],
    },
    {
        timestamps: true,
    },
);

module.exports = Users;
