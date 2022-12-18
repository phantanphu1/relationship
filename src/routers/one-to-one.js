const express = require("express");
const router = express.Router();
const OneToOne = require('../controllers/one-to-one')

router.post("/api/customer",OneToOne.createCustomer);
router.get("/api/getAllCustomer",OneToOne.getAllIdentifiers);
router.get("/api/getCustomerById/:id",OneToOne.getIdentifierById);

module.exports = router