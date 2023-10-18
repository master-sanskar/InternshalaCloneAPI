const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeModel = new mongoose.Schema(
    {
        firstname: {
            type: String,
            require: [true, "First name is required"],
            minLength: [4, "First name should be atleast 4 character long"],
        },
        lastname: {
            type: String,
            require: [true, "Last name is required"],
            minLength: [4, "Last name should be atleast 4 character long"],
        },
        contact: {
            type: String,
            require: [true, "Contact is required"],
            maxLength: [11, "Contact must not exceed 10 character"],
            minLength: [10, "Contact should be atleast 10 character"],
        },
        email: {
            type: String,
            unique: true,
            require: [true, "Email is required"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address",
            ],
        },
        password: {
            type: String,
            select: false,
            maxLength: [
                15,
                "Password should not exceed more than 15 characters",
            ],
            minLength: [
                6,
                "Password should have atleast 6 characters",
            ],
            // match:[]
        },
        resetPasswordToken: {
            type: String,
            default: "0",
        },
        organizationname: {
            type: String,
            require: [true, "Organization Name is required"],
            minLength: [4, "Organization Name should be atleast 4 character long"],
        },
        organizationlogo: {
            type: Object,
            default: {
                fileId: "",
                url: "https://images.unsplash.com/photo-1689214102076-2e33ea49e2b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
            },
        },
        resume: {
            internships: [
                { type: mongoose.Schema.Types.ObjectId, ref: "internships" }
            ],
            jobs: [
                { type: mongoose.Schema.Types.ObjectId, ref: "job" }
            ],
        },
    },
    { timestamps: true }
);

// bcrypt (ye code tb chale g jb ap passwrd reset, forget, y fir very first time passwrd dale)
employeModel.pre("save", function () {

    // jab tk password modify na rhe tb tk ye nhi chl n chahiye
    if (!this.isModified("password")) {
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

employeModel.methods.comparepassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// login & register k time pr token chle g
employeModel.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const Employe = mongoose.model("employe", employeModel);

module.exports = Employe;


