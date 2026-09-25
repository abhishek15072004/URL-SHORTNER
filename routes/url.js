const express = require("express");

const router = express.Router();

const {
    handlegeneratenewshorturl,
    handlegetanalytics,
} = require("../controllers/url");

router.post("/", handlegeneratenewshorturl);
router.get('/analytics/:shortid',  handlegetanalytics)

module.exports = router;