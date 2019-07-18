const express = require('express');
const router = express.Router();
const svgGenerator = require('../controllers/svgGenerator');
const svgHeaderDetails = require('../controllers/svgHeaderDetails');

router.post('/svg', svgGenerator.getPlayerSVG);
router.post('/details', svgHeaderDetails.getSVGHeaderDetails);

module.exports = router;