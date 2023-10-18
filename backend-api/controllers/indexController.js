const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const path = require("path");
const imagekit = require("../utils/imagekit").initImageKit();

// home page
exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Secure Homepage!" });
});

// currentuser-student-id
exports.currentUser = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    res.json({ student });
});

// signup
exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
    const student = await new Student(req.body).save();
    sendtoken(student, 201, res);
});

// signin
exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email })
        .select("+password")
        .exec();

    if (!student)
        return next(
            new ErrorHandler("User not found with this email address", 404)
        );

    const isMatch = student.comparepassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("Wrong Credientials!", 500));

    sendtoken(student, 200, res);
});

// signout
exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: "Successfully signout!" });
});

// sendmail (forgot password)
exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).exec();

    if (!student)
        return next(
            new ErrorHandler("User not found with this email address", 404)
        );

    // Link Genrate
    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`;
    sendmail(req, res, next, url);
    student.resetPasswordToken = "1";
    await student.save();
    res.json({ student, url });
});

// studentforgetlink
exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();

    if (!student)
        return next(
            new ErrorHandler("User not found with this email address", 404)
        );

    if (student.resetPasswordToken == "1") {
        student.resetPasswordToken = "0";
        student.password = req.body.password;
        await student.save();
    } else {
        return next(
            new ErrorHandler("Invalid Reset Password Link! Please try again", 500)
        );
    }

    res.status(200).json({
        message: "Password has been Successfully Changed",
    });
});

// studentresetpassword
exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.password = req.body.password;
    await student.save();
    sendtoken(student, 201, res);

    // res.status(200).json({
    //     message: "Password has been Successfully reset",
    // });
});

// studentupdate
exports.studentupdate = catchAsyncErrors(async (req, res, next) => {
    await Student.findByIdAndUpdate(req.params.id, req.body).exec();
    res.status(200).json({
        success: true,
        message: "Student Updated Successfully!",
    });
});

// studentavatar - photo upload krne k liye use hota hai
exports.studentavatar = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();
    const file = req.files.avatar;
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

    if (student.avatar.fileId !== "") {
        await imagekit.deleteFile(student.avatar.fileId);
    }

    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName,
    });
    student.avatar = { fileId, url };
    await student.save();
    res.status(200).json({
        success: true,
        message: "Profile uploaded!",
    });
});
