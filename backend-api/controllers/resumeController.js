const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require('uuid');

// crud opertion

exports.resume = catchAsyncErrors(async (req, res, next) => {
    const { resume } = await Student.findById(req.id).exec();
    res.json({ message: "Secure Resume Page!", resume });
});

// ---------------------- Education -----------------------

exports.addeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Education Added!" });
});

exports.editeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex(
        (i) => i.id === req.params.eduid
    );
    student.resume.education[eduIndex] = {
        ...student.resume.education[eduIndex],
        ...req.body,
    };
    await student.save();
    res.json({ message: "Education Updated!" });
});

exports.deleteeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter(
        (i) => i.id !== req.params.eduid
    );
    student.resume.education = filterededu;
    await student.save();
    res.json({ message: "Education Deleted!" });
});

// ------------------- job ---------------------

exports.addjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Jobs Added!" });
});

exports.editjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex(
        (i) => i.id === req.params.eduid
    );
    student.resume.education[eduIndex] = {
        ...student.resume.education[eduIndex],
        ...req.body,
    };
    await student.save();
    res.json({ message: "Jobs Updated!" });
});

exports.deletejob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter(
        (i) => i.id !== req.params.eduid
    );
    student.resume.education = filterededu;
    await student.save();
    res.json({ message: "Jobs Deleted!" });
});

// ------------------ Internships -------------------

exports.addintern = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Internship Added!" });
});

exports.editintern = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex(
        (i) => i.id === req.params.eduid
    );
    student.resume.education[eduIndex] = {
        ...student.resume.education[eduIndex],
        ...req.body,
    };
    await student.save();
    res.json({ message: "Internship Updated!" });
});

exports.deleteintern = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter(
        (i) => i.id !== req.params.eduid
    );
    student.resume.education = filterededu;
    await student.save();
    res.json({ message: "Internships Deleted!" });
});

// -------------------- Responsibilities -----------------------

exports.addresp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Responsibilities Added!" });
});

exports.editresp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex(
        (i) => i.id === req.params.eduid
    );
    student.resume.education[eduIndex] = {
        ...student.resume.education[eduIndex],
        ...req.body,
    };
    await student.save();
    res.json({ message: "Responsibilities Updated!" });
});

exports.deleteresp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter(
        (i) => i.id !== req.params.eduid
    );
    student.resume.education = filterededu;
    await student.save();
    res.json({ message: "Responsibilities Deleted!" });
});

// ------------------ Courses ---------------------

exports.addcours= catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Courses Added!" });
});

exports.editcours = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex(
        (i) => i.id === req.params.eduid
    );
    student.resume.education[eduIndex] = {
        ...student.resume.education[eduIndex],
        ...req.body,
    };
    await student.save();
    res.json({ message: "Courses Updated!" });
});

exports.deletecours = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter(
        (i) => i.id !== req.params.eduid
    );
    student.resume.education = filterededu;
    await student.save();
    res.json({ message: "Courses Deleted!" });
});

// ---------------- Projects ---------------------

exports.addproj = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Projects Added!" });
});

exports.editproj = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex(
        (i) => i.id === req.params.eduid
    );
    student.resume.education[eduIndex] = {
        ...student.resume.education[eduIndex],
        ...req.body,
    };
    await student.save();
    res.json({ message: "Projects Updated!" });
});

exports.deleteproj = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter(
        (i) => i.id !== req.params.eduid
    );
    student.resume.education = filterededu;
    await student.save();
    res.json({ message: "Projects Deleted!" });
});

// ------------------- Skills ------------------------

exports.addskill = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Skills Added!" });
});

exports.editskill = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex(
        (i) => i.id === req.params.eduid
    );
    student.resume.education[eduIndex] = {
        ...student.resume.education[eduIndex],
        ...req.body,
    };
    await student.save();
    res.json({ message: "Skills Updated!" });
});

exports.deleteskill = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter(
        (i) => i.id !== req.params.eduid
    );
    student.resume.education = filterededu;
    await student.save();
    res.json({ message: "Skills Deleted!" });
});

// ------------------ Accomplishments ---------------------

exports.addacomp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Accomplishments Added!" });
});

exports.editacomp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex(
        (i) => i.id === req.params.eduid
    );
    student.resume.education[eduIndex] = {
        ...student.resume.education[eduIndex],
        ...req.body,
    };
    await student.save();
    res.json({ message: "Accomplishments Updated!" });
});

exports.deleteacomp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter(
        (i) => i.id !== req.params.eduid
    );
    student.resume.education = filterededu;
    await student.save();
    res.json({ message: "Accomplishments Deleted!" });
});
