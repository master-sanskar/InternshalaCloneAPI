const express = require("express");
const router = express.Router();
const
    {
        homepage,
        currentEmploye,
        employesignup,
        employesignin,
        employesignout,
        employesendmail,
        employeforgetlink,
        employeresetpassword,
        employeupdate,
        employeavatar,

        createinternship,
        readinternship,
        readsingleinternship,
    } = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");


// GET K "/" ROUTE
router.get("/", homepage);

// POST /employe ko - cll kre g tb
router.post("/current", isAuthenticated, currentEmploye);

// POST /employe/signup
router.post("/signup", employesignup);

// POST /employe/signin
router.post("/signin", employesignin);

// POST /employe/signout
router.post("/signout", isAuthenticated, employesignout);

// POST /employe/send-mail
router.post("/send-mail", employesendmail);

// GET /employe/forget-link/:employeid
router.get("/forget-link/:id", employeforgetlink);

// POST /employe/reset-password/:employeid
router.post("/reset-password/:id", isAuthenticated, employeresetpassword);

// POST /employe/update/:employeid
router.post("/update/:id", isAuthenticated, employeupdate);

// POST /employe/avatar/:employeid (business logo)
router.post("/avatar/:id", isAuthenticated, employeavatar);

// ------------ Internship ------------

// POST /employe/internship/create
router.post("/internship/create", isAuthenticated, createinternship);

// POST /employe/internship/read
router.post("/internship/read", isAuthenticated, readinternship);

// POST /employe/internship/read
router.post("/internship/read/:id", isAuthenticated, readsingleinternship);

module.exports = router;
